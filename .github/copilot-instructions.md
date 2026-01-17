# Development Instructions

## Project Architecture

This project follows **Layered (Clean) Architecture** principles:
- **Domain Layer**: Business entities and core logic (innermost layer)
- **Application Layer**: Use cases and application-specific business rules
- **Infrastructure Layer**: External concerns (database, APIs, frameworks)
- **API Gateway**: Entry points (controllers, routes)

**Module Interaction**: Use the **Anticorruption** layer (in `Infrastructure`) to isolate dependencies between modules. Define interfaces in inner layers and implement them in the Anticorruption layer.

## Module Interaction via Anticorruption Layer

When one module needs to interact with another module, follow the Anticorruption pattern to maintain clean boundaries and prevent tight coupling:

### Pattern Overview
If **ModuleA** needs data or functionality from **ModuleB**:

1. **Define Interface in ModuleA** (Application/Contract layer)
2. **Implement in ModuleA's Anticorruption Layer** (Infrastructure/Anticorruption/ModuleB)
3. **Call ModuleB's Application Services** from the Anticorruption implementation

### Example: ModuleA needs data from ModuleB

#### 1. Define Interface in ModuleA/Application/Contract
Create `src/Module/ModuleA/Application/Contract/ModuleBProviderInterface.ts`:
```typescript
import { ModuleBDTO } from '@/Module/ModuleA/Application/Type/ModuleBDTO';

export interface ModuleBProviderInterface {
  getEntityByUuid(uuid: string): Promise<ModuleBDTO | undefined>;
}
```

#### 2. Implement in ModuleA/Infrastructure/Anticorruption/ModuleB
Create `src/Module/ModuleA/Infrastructure/Anticorruption/ModuleB/ModuleBProvider.ts`:
```typescript
import { Injectable } from '@nestjs/common';
import { ModuleBProviderInterface } from '@/Module/ModuleA/Application/Contract/ModuleBProviderInterface';
import { ModuleBDTO } from '@/Module/ModuleA/Application/Type/ModuleBDTO';
import { ModuleBService } from '@/Module/ModuleB/Application/ModuleBService';

@Injectable()
export class ModuleBProvider implements ModuleBProviderInterface {
  constructor(
    private readonly moduleBService: ModuleBService,
  ) {}

  async getEntityByUuid(uuid: string): Promise<ModuleBDTO | undefined> {
    return this.moduleBService.getEntityByUuid(uuid);
  }
}
```

#### 3. Register Provider Symbol
Add to `src/Common/Contract/TypesAssociation.ts`:
```typescript
export const TYPES = {
  // ModuleA symbols
  ModuleBProvider: Symbol.for('ModuleBProviderInterface'),
  // ... other symbols
};
```

#### 4. Create Provider Factory
Add to `src/Provider/service-provider.ts`:
```typescript
import { TYPES } from '@/Common/Contract/TypesAssociation';
import { ModuleBProvider } from '@/Module/ModuleA/Infrastructure/Anticorruption/ModuleB/ModuleBProvider';
import { ModuleBService } from '@/Module/ModuleB/Application/ModuleBService';

export const moduleBProviderForModuleA = {
  provide: TYPES.ModuleBProvider,
  inject: [ModuleBService],
  useFactory(moduleBService: ModuleBService) {
    return new ModuleBProvider(moduleBService);
  },
};
```

Register in `src/Provider/index.ts`:
```typescript
export const PROVIDERS = [
  // ...existing providers
  moduleBProviderForModuleA,
] as const;
```

#### 5. Use in ModuleA's Application Layer
```typescript
import { Injectable, Inject } from '@nestjs/common';
import { TYPES } from '@/Common/Contract/TypesAssociation';
import { ModuleBProviderInterface } from '@/Module/ModuleA/Application/Contract/ModuleBProviderInterface';

@Injectable()
export class SomeModuleAService {
  constructor(
    @Inject(TYPES.ModuleBProvider)
    private readonly moduleBProvider: ModuleBProviderInterface,
  ) {}

  async execute(entityUuid: string): Promise<void> {
    const entity = await this.moduleBProvider.getEntityByUuid(entityUuid);
    // Use ModuleB data in ModuleA's logic
  }
}
```

**Key Principles:**
- **Never import domain entities from other modules** - only use DTOs
- **Only call Application layer services** from other modules (never repositories or domain entities directly)
- **Define interfaces in Application/Contract** of the consuming module
- **Implement in Infrastructure/Anticorruption/{SourceModule}** of the consuming module
- **Use dependency injection** to wire up the Anticorruption layer
- This pattern keeps modules loosely coupled and easier to test/maintain

## Repository Pattern

Repositories follow a strict layered approach for data access:

### 1. Define the Interface (Domain Layer)
Create the repository interface in `src/Module/{ModuleName}/Domain/Repository/{EntityName}RepositoryInterface.ts`:
```typescript
import { Entity } from '../Entity/Entity';

export interface EntityRepositoryInterface {
  findByUuid(uuid: string): Promise<Entity | undefined>;
  findByEmail(email: string): Promise<Entity | undefined>;
  findAll(): Promise<Entity[]>;
  // Add other domain-specific query methods
}
```

### 2. Implement the Repository (Infrastructure Layer)
Create the concrete implementation in `src/Module/{ModuleName}/Infrastructure/{EntityName}Repository.ts`:
```typescript
import { EntityRepositoryInterface } from '../Domain/Repository/EntityRepositoryInterface';
import { Entity } from '../Domain/Entity/Entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class EntityRepository
  extends Repository<Entity>
  implements EntityRepositoryInterface
{
  constructor(dataSource: DataSource) {
    super(Entity, dataSource.createEntityManager());
  }

  // Implement all interface methods
  async findByUuid(uuid: string): Promise<Entity | undefined> {
    return this.findOne({ where: { uuid } });
  }
}
```

### 3. Register Repository Symbol (Common/Contract)
Add a symbol for dependency injection in `src/Common/Contract/TypesAssociation.ts`:
```typescript
export const TYPES = {
  EntityRepository: Symbol.for('EntityRepositoryInterface'),
  // ... other symbols
};
```

### 4. Create Provider Factory (Provider Layer)
Create a provider factory in `src/Provider/repository-provider.ts`:
```typescript
import { TYPES } from '../Common/Contract/TypesAssociation';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityRepository } from '../Module/{ModuleName}/Infrastructure/EntityRepository';

export const entityRepositoryProvider = {
  provide: TYPES.EntityRepository,
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return new EntityRepository(datasource);
  },
};
```

Then register it in `src/Provider/index.ts`:
```typescript
export const PROVIDERS = [
  // ...existing providers
  entityRepositoryProvider,
] as const;
```

### 5. Use in Application Layer (Use Cases)
Inject the repository interface in use cases via dependency injection:
```typescript
import { EntityRepositoryInterface } from '../Domain/Repository/EntityRepositoryInterface';
import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../../../Common/Contract/TypesAssociation';

@Injectable()
export class GetEntityUseCase {
  constructor(
    @Inject(TYPES.EntityRepository)
    private readonly entityRepository: EntityRepositoryInterface,
  ) {}

  async execute(uuid: string): Promise<EntityDTO | undefined> {
    const entity = await this.entityRepository.findByUuid(uuid);
    // Transform and return
  }
}
```

**Key Principles:**
- Repository interfaces live in the **Domain layer** (no framework dependencies)
- Repository implementations live in the **Infrastructure layer** (framework-specific)
- Use cases depend on **interfaces**, not concrete implementations
- Dependency injection is configured via **TypesAssociation** and **providers**
- Repositories extend TypeORM's `Repository<T>` for built-in query capabilities
- **Use EntityManager to save entities** (inject `EntityManagerInterface` from `Common/Contract`)
- **Never expose domain entities from the Application layer** - always map to DTOs before returning

## Running Console Commands

Execute all console commands inside the Node Docker container:

```bash
docker-compose exec node <your-command>
```

**Examples:**
- `docker-compose exec node npm install`
- `docker-compose exec node bash` (shell access)


