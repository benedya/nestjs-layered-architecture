import { NotificationType } from '../Type/NotificationType';

export class Notification {
  uuid: string;

  userUuid: string;

  message: string;

  type: NotificationType;

  createdAt: Date;

  sentAt: Date | null = null;

  sendingError: string | null = null;
}
