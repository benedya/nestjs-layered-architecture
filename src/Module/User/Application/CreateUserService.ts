import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '@/Common/Contract/TypesAssociation';
import { EntityManagerInterface } from '@/Common/Contract/EntityManagerInterface';
import { User } from '../Domain/Entity/User';
import { CreateUserDTO } from './Type/CreateUserDTO';
import { UserDTO } from './Type/UserDTO';
import { UserMapper } from './Mapper/UserMapper';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(TYPES.EntityManager)
    private readonly entityManager: EntityManagerInterface,
  ) {}

  async execute(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const user = new User();
    user.name = createUserDTO.name;
    user.messengerId = createUserDTO.messengerId;
    user.isActive = true;
    user.createdAt = new Date();

    await this.entityManager.transaction(user);

    return UserMapper.toDTO(user);
  }
}
