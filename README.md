# [NestJS + Layered (Clean) Architecture + TypeORM](https://github.com/benedya/nestjs-layered-architecture)

This is a project template for building NestJS applications with layered architecture (Clean), utilizing TypeORM for database access. This template is a starting point for your NestJS projects.

## Features

- **[NestJS Framework](https://nestjs.com/)**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

- **[Layered (Clean) Architecture](https://github.com/benedya/nodejs-layered-architecture)**: The project follows the Clean architecture pattern that separates concerns by dividing the application into concentric layers, with each layer having its responsibilities and dependencies

- **[TypeORM](https://typeorm.io/)**: Integrated with TypeORM for easy database interaction, allowing you to use various database systems like MySQL, PostgreSQL, MongoDB, etc.


## Getting Started

1. Clone this repository to your local machine:

```bash
   git clone https://github.com/benedya/nestjs-layered-architecture.git
```
2. Configure your environment variables by creating a `.env` file and populating it with your database connection details and other configuration:
```bash
cd nestjs-layered-architecture
cp .env.example .env
```
3. Build services:
```bash
docker compose build
```
4. Run services:
```bash
docker compose up
```
5. Your NestJS application is now running locally. You can access it at http://localhost:3001.
   Controllers you can find in the [src/ApiGateway](src/ApiGateway) directory.

## Project Structure
The project is structured as follows:
```
├─ src/
│   ├── ApiGateway
│   ├── Common
│   ├── Constant
│   ├── Database
│   ├── Helper
│   ├── Module
│   ├── Provider
│   ├── Service
│   ├── app.module.ts
│   └── main.ts
```

- `ApiGateway`: This directory contains the API endpoints for your NestJS application.

- `Common`: The `Common` directory holds shared code that can be used in modules.

- `Constants`: Here, you store constant values and configurations used throughout the application.

- `Database`: The database directory holds configurations related to database connectivity and setup.

- `Helper`: This directory is meant for utility functions and helper classes that can be used across the application.

- `Module`: The `Module` directory is where the heart of your application resides. It follows the [layered architecture](https://github.com/benedya/nodejs-layered-architecture) pattern to keep the codebase organized.

- `Provider`: Contains provider factories for dependency injection.

- `Service`: Contains infrastructure services.

- `app.module.ts`: The main NestJS application module where you import and configure all your feature modules.

- `main.ts`: The entry point of the application that bootstraps the NestJS server.
### Anticorruption
To prevent uncontrolled dependencies between modules there we can use `Anticorruption` layer.

The main ideas are the next:
- Interaction between modules should be isolated in `Anticorruption` layer.
- The `Anticorruption` layer is placed in the `Infrastructure` layer.
    - Because such interaction is treated as an interaction with outer layer.
- If in an inner layer (`Application`, `Domain`) we need to use some functionality from another module, then:
    - Create an interface in the inner layer and use it there.
    - Create an implementation of the interface in the `Anticorruption` layer.
    - In that implementation, use the functionality from the outer module.

## Example Project

This template includes a working example demonstrating the layered architecture in action with two modules:

- **User Module** (`src/Module/User`): Manages user entities with CRUD operations. Includes:
    - Domain layer with User entity and repository interface
    - Application layer with services (Create, Get, Update, List) and DTOs
    - Infrastructure layer with TypeORM repository implementation
    - User mapper for entity-to-DTO transformations

- **Quote Module** (`src/Module/Quote`): Manages quotes and their posting to external services. Includes:
    - Domain layer with Quote and QuotePosting entities
    - Application layer with services (Create, Post, List) and DTOs
    - Infrastructure layer with repositories and external service integration (Telegram)
    - **Anticorruption layer** demonstrating inter-module communication

### Anticorruption Communication Example

The Quote module demonstrates the Anticorruption pattern by communicating with the User module:

- **Interface defined**: `UserProviderInterface` in `Quote/Application/Contract`
- **Implementation**: `UserProvider` in `Quote/Infrastructure/Anticorruption/User`
- **Usage**: Quote services use the interface to fetch user data without directly depending on the User module's internals

Following this approach, the Application layer doesn't depend on other modules directly but communicates with them as outer dependencies. This makes module interaction clear and manageable, maintains clean boundaries between modules.
## Development

- **Start in development mode**: `npm run start:dev` (inside Docker: `docker-compose exec node npm run start:dev`)
- **Build**: `npm run build` (inside Docker: `docker-compose exec node npm run build`)
- **Run tests**: `npm test` (inside Docker: `docker-compose exec node npm test`)

## GitHub Copilot Support

This project includes [`.github/copilot-instructions.md`](.github/copilot-instructions.md) that helps GitHub Copilot understand and follow the layered architecture patterns when generating code. The instructions guide Copilot to:

- Follow the correct layered architecture structure (Domain → Application → Infrastructure → API Gateway)
- Properly implement the Repository pattern with interfaces and dependency injection
- Use the Anticorruption layer for module-to-module communication
- Apply best practices for DTOs, providers, and use cases

This ensures that AI-assisted code generation stays consistent with the project's architectural principles.

---

Hopefully this example helps you build robust and scalable applications using the power of Clean Architecture. Happy coding! If you have any questions or need assistance, please don't hesitate to reach out.