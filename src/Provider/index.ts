import {
  entityManagerProvider,
  userNotificationsSettingsProvider,
} from './service-provider';
import { userRepositoryProvider } from './repository-provider';

export const PROVIDERS = [
  entityManagerProvider,
  userRepositoryProvider,
  userNotificationsSettingsProvider,
] as const;
