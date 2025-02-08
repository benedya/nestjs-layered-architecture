import { NotificationsSettingsUseCase } from './Application/NotificationsSettingsUseCase';
import { CreateUserUseCase } from './Application/CreateUserUseCase';
import { WelcomeUserUseCase } from './Application/WelcomeUserUseCase';
import { ListUsersUseCase } from './Application/ListUsersUseCase';

export const SERVICES = [
  NotificationsSettingsUseCase,
  CreateUserUseCase,
  WelcomeUserUseCase,
  ListUsersUseCase,
] as const;
