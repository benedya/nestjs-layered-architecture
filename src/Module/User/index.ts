import { NotificationsSettingsUseCase } from './Application/NotificationsSettingsUseCase';
import { CreateUserUseCase } from './Application/CreateUserUseCase';
import { GetUserUseCase } from './Application/GetUserUseCase';
import { ListUsersUseCase } from './Application/ListUsersUseCase';

export const SERVICES = [
  NotificationsSettingsUseCase,
  CreateUserUseCase,
  GetUserUseCase,
  ListUsersUseCase,
] as const;
