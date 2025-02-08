import { NotificationsSettings } from './Type/NotificationsSettings';

export interface UserNotificationsSettingsProviderInterface {
  getSettings(userUuid: string): Promise<NotificationsSettings>;
}
