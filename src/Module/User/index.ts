import { NotificationsSettingsUseCase } from './Application/NotificationsSettingsUseCase';
import { CreateUserUseCase } from './Application/CreateUserUseCase';
import { WelcomeUserUseCase } from './Application/WelcomeUserUseCase';

export const SERVICES = [
  NotificationsSettingsUseCase,
  CreateUserUseCase,
  WelcomeUserUseCase,
] as const;
