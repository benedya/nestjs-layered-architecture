import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { WelcomeUserUseCase } from '../../Module/User/Application/WelcomeUserUseCase';
import { NewUserPayload } from './Type/NewUserPayload';
import { CreateUserUseCase } from '../../Module/User/Application/CreateUserUseCase';
import { User } from './Type/User';
import { ListUsersUseCase } from '../../Module/User/Application/ListUsersUseCase';

@Controller('/api/users')
export class UserController {
  constructor(
    private readonly welcomeUserUseCase: WelcomeUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) {}

  @Get('')
  async list(): Promise<User[]> {
    const users = await this.listUsersUseCase.getAllUsers();

    return users.map((user) => ({ ...user }));
  }

  @Post('')
  async create(@Body() payload: NewUserPayload): Promise<{ uuid: string }> {
    const result = await this.createUserUseCase.create(
      payload.name,
      payload.email,
    );

    return {
      uuid: result.uuid,
    };
  }

  @Get('/:uuid')
  async get(@Param('uuid') uuid: string): Promise<{ welcomeMessage: string }> {
    const welcome = await this.welcomeUserUseCase.welcome(uuid);

    if (!welcome) {
      throw new HttpException('Not found.', HttpStatus.NOT_FOUND);
    }

    return {
      welcomeMessage: welcome.message,
    };
  }
}
