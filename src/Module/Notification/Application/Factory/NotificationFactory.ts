import { Notification } from '../../Domain/Entity/Notification';
import { NotificationType } from '../../Domain/NotificationType';
import { NotificationPayload } from '../Type/NotificationPayload';

export class NotificationFactory {
  public static createEmailNotification(
    payload: NotificationPayload,
  ): Notification {
    const notification = NotificationFactory.createNotification(payload);

    notification.type = NotificationType.EMAIL;

    return notification;
  }

  private static createNotification(
    payload: NotificationPayload,
  ): Notification {
    const notification = new Notification();

    notification.userUuid = payload.userUuid;
    notification.message = payload.message;
    notification.createdAt = new Date();

    return notification;
  }
}
