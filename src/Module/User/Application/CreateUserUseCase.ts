import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';
import { User } from '../Domain/Entity/User';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { TYPES } from '../../../Common/Contract/TypesAssociation';
import { ApplicationException } from '../../../Common/Exception/ApplicationException';
import { randomUUID } from 'crypto';
import { UserMapper } from './Mapper/UserMapper';
import { EntityManagerInterface } from '../../../Common/Contract/EntityManagerInterface';
import { UserFull } from './Type/UserFull';
import { NotificationSenderInterface } from '../../../Common/Contract/NotificationSenderInterface';

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface,
    @Inject(TYPES.EntityManager)
    private readonly entityManager: EntityManagerInterface,
    @Inject(TYPES.NotificationSender)
    private readonly notificationSender: NotificationSenderInterface,
  ) {}

  async create(name: string, email: string): Promise<UserFull> {
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
    user.createdAt = new Date();

    this.logger.log(`Creating user with uuid: ${user.uuid}`);

    await this.entityManager.transaction(user);

    await this.notificationSender.sendEmailNotification(
      user.uuid,
      'Welcome!',
      `Welcome, ${user.name}!`,
    );

    return UserMapper.toFull(user);
  }
}
