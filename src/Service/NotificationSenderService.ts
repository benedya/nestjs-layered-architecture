import { NotificationSenderInterface } from '../Common/Contract/NotificationSenderInterface';
import { CreateNotificationUseCase } from '../Module/Notification/Application/CreateNotificationUseCase';
import { NotificationType } from '../Module/Notification/Domain/Type/NotificationType';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationSenderService implements NotificationSenderInterface {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
  ) {}

  async sendEmailNotification(
    userUuid: string,
    subject: string,
    message: string,
  ): Promise<void> {
    await this.createNotificationUseCase.createNotification({
      userUuid,
      message,
      notificationType: NotificationType.EMAIL,
      // subject, // todo: add subject to the payload
    });
  }
}
