import { CreateNotificationUseCase } from './Application/CreateNotificationUseCase';
import {
  UserNotificationsSettingsProvider
} from './Infrastructure/Anticorruption/User/UserNotificationsSettingsProvider';

export const SERVICES = [
  CreateNotificationUseCase,
  UserNotificationsSettingsProvider,
] as const;
