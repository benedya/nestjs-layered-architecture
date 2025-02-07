import { UserNotificationsSettingsProviderInterface } from '../../../Application/UserNotificationsSettingsProviderInterface';
import { NotificationsSettings } from '../../../Application/Type/NotificationsSettings';
import { NotificationsSettingsUseCase } from '../../../../User/Application/NotificationsSettingsUseCase';

export class UserNotificationsSettingsProvider
  implements UserNotificationsSettingsProviderInterface
{
  constructor(
    private readonly notificationsSettingsUseCase: NotificationsSettingsUseCase,
  ) {}

  async getSettings(userUuid: string): Promise<NotificationsSettings> {
    const userNotificationsSettings =
      await this.notificationsSettingsUseCase.getUserNotificationsSettings(
        userUuid,
      );

    return {
      ...userNotificationsSettings,
    };
  }
}
