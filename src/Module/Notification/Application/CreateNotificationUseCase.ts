import { NotificationPayload } from './Type/NotificationPayload';
import { UserNotificationsSettingsProviderInterface } from './UserNotificationsSettingsProviderInterface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { EntityManagerInterface } from '../../../Common/Contract/EntityManagerInterface';
import { TYPES } from '../../../Common/Contract/TypesAssociation';
import { Notification } from '../Domain/Entity/Notification';
import { NotificationFactory } from './Factory/NotificationFactory';

@Injectable()
export class CreateNotificationUseCase {
  private readonly logger = new Logger(CreateNotificationUseCase.name);

  constructor(
    @Inject(TYPES.UserNotificationsSettingsProvider)
    private readonly userNotificationsSettingsProvider: UserNotificationsSettingsProviderInterface,
    @Inject(TYPES.EntityManager)
    private readonly entityManager: EntityManagerInterface,
  ) {}

  async createNotification(payload: NotificationPayload): Promise<void> {
    const settings = await this.userNotificationsSettingsProvider.getSettings(
      payload.userUuid,
    );

    const notifications: Notification[] = [];

    if (settings.emailNotificationsEnabled) {
      const notification = NotificationFactory.createEmailNotification(payload);

      notifications.push(notification);

      this.logger.log(
        `Creating email notification "${notification.uuid}" for user "${payload.userUuid}"`,
      );
    }

    if (notifications.length === 0) {
      return;
    }

    await this.entityManager.transaction(...notifications);
  }
}
