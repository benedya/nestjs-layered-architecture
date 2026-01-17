import { CreateUserService } from './Application/CreateUserService';
import { GetUserService } from './Application/GetUserService';
import { UpdateUserService } from './Application/UpdateUserService';
import { GetUserListService } from '@/Module/User/Application/GetUserListService';

export const SERVICES = [
  CreateUserService,
  GetUserService,
  UpdateUserService,
  GetUserListService,
] as const;
