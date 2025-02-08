import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';
import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../../../Common/Contract/TypesAssociation';
import { UserShort } from './Type/UserShort';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<UserShort[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => ({
      uuid: user.uuid,
      name: user.name,
      email: user.email,
    }));
  }
}
