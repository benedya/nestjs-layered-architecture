import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '@/Common/Contract/TypesAssociation';
import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';
import { CreateUserService } from './CreateUserService';
import { CreateUserDTO } from './Type/CreateUserDTO';
import { UserDTO } from './Type/UserDTO';
import { UserMapper } from '@/Module/User/Application/Mapper/UserMapper';

@Injectable()
export class GetUserService {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface,
    private readonly createUserUseCase: CreateUserService,
  ) {}

  async findUserById(id: number): Promise<UserDTO | undefined> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return;
    }

    return UserMapper.toDTO(user);
  }

  async getUser(userPayload: CreateUserDTO): Promise<UserDTO> {
    const existingUser = await this.userRepository.findByMessengerId(
      userPayload.messengerId,
    );

    if (existingUser) {
      return existingUser;
    }

    return await this.createUserUseCase.execute(userPayload);
  }
}
