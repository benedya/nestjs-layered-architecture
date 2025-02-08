import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { GetUserUseCase } from '../../Module/User/Application/GetUserUseCase';
import { NewUserPayload } from './Type/NewUserPayload';
import { CreateUserUseCase } from '../../Module/User/Application/CreateUserUseCase';
import { UserDetails } from './Type/UserDetails';
import { ListUsersUseCase } from '../../Module/User/Application/ListUsersUseCase';
import { UserMapper } from './Mapper/UserMapper';

@Controller('/api/users')
export class UserController {
  constructor(
    private readonly welcomeUserUseCase: GetUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) {}

  @Get('')
  async list(): Promise<UserDetails[]> {
    const users = await this.listUsersUseCase.getAllUsers();

    return users.map((user) => ({ ...user }));
  }

  @Post('')
  async create(@Body() payload: NewUserPayload): Promise<UserDetails> {
    const createdUser = await this.createUserUseCase.create(
      payload.name,
      payload.email,
    );

    return UserMapper.toUserDetails(createdUser);
  }

  @Get('/:uuid')
  async get(@Param('uuid') uuid: string): Promise<UserDetails> {
    const user = await this.welcomeUserUseCase.findUserByUuid(uuid);

    if (!user) {
      throw new HttpException('Not found.', HttpStatus.NOT_FOUND);
    }

    return UserMapper.toUserDetails(user);
  }
}
