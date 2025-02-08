import {
  entityManagerProvider,
  notificationSenderProvider,
  userNotificationsSettingsProvider,
} from './service-provider';
import { userRepositoryProvider } from './repository-provider';

export const PROVIDERS = [
  entityManagerProvider,
  userRepositoryProvider,
  userNotificationsSettingsProvider,
  notificationSenderProvider,
] as const;
