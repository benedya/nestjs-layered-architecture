import { NotificationType } from '../../Domain/Type/NotificationType';

// todo better name
export interface NotificationPayload {
  notificationType: NotificationType;
  message: string;
  userUuid: string;
}
