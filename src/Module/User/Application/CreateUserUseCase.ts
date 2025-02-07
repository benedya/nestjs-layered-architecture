import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';
import { User } from '../Domain/Entity/User';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { TYPES } from '../../../Contract/TypesAssociation';
import { ApplicationException } from '../../Shared/Exception/ApplicationException';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {
    this.userRepository = userRepository;
  }

  async create(name: string, email: string): Promise<{ uuid: string }> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ApplicationException(
        `User with email "${email}" already exists.`,
      );
    }

    const user = new User();

    user.uuid = randomUUID();
    user.name = name;
    user.email = email;

    this.logger.log(`Creating user with uuid: ${user.uuid}`);

    // todo use entity manager
    await this.userRepository.save(user);

    return { uuid: user.uuid };
  }
}
