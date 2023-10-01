import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';
import { User } from '../Domain/Entity/User';
import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../../../Constant/TypesAssociation';
import { ApplicationException } from '../../Shared/Exception/ApplicationException';

@Injectable()
export class CreateUserUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(
    @Inject(TYPES.UserRepository) userRepository: UserRepositoryInterface,
  ) {
    this.userRepository = userRepository;
  }

  async create(name: string): Promise<{ uuid: string }> {
    const existingUser = await this.userRepository.findByUuid(name);

    if (existingUser) {
      throw new ApplicationException(
        `User with name "${name}" already exists.`,
      );
    }

    const user = new User(name);

    await this.userRepository.save(user);

    return { uuid: user.uuid };
  }
}
