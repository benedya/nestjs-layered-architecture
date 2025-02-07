import { NotificationType } from '../../Domain/NotificationType';

// todo better name
export interface NotificationPayload {
  notificationType: NotificationType;
  message: string;
  userUuid: string;
}
