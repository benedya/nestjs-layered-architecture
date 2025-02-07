import { UserNotificationsSettings } from './Type/UserNotificationsSettings';
import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../../../Common/Contract/TypesAssociation';
import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';
import { ApplicationException } from '../../../Common/Exception/ApplicationException';

@Injectable()
export class NotificationsSettingsUseCase {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async getUserNotificationsSettings(
    userUuid: string,
  ): Promise<UserNotificationsSettings> {
    const user = await this.userRepository.findByUuid(userUuid);

    if (!user) {
      throw new ApplicationException(`User with uuid "${userUuid}" not found.`);
    }

    return {
      emailNotificationsEnabled: user.emailNotificationsEnabled,
    };
  }
}
