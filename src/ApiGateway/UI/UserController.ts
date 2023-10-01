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

@Controller('/api/users')
export class UserController {
  private welcomeUserUseCase: WelcomeUserUseCase;
  private createUserUseCase: CreateUserUseCase;

  constructor(
    welcomeUserUseCase: WelcomeUserUseCase,
    createUserUseCase: CreateUserUseCase,
  ) {
    this.welcomeUserUseCase = welcomeUserUseCase;
    this.createUserUseCase = createUserUseCase;
  }

  @Post('')
  async create(@Body() payload: NewUserPayload): Promise<{ uuid: string }> {
    const result = await this.createUserUseCase.create(payload.name);

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
