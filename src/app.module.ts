import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './Module/User/Application/CreateUserUseCase';
import { UserRepository } from './Module/User/Infrastructure/UserRepository';
import { TYPES } from './Constant/TypesAssociation';
import { getDataSourceToken } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from './Database/TypeORMConfig';
import { WelcomeUserUseCase } from './Module/User/Application/WelcomeUserUseCase';
import { UserController } from './ApiGateway/UI/UserController';
import { DataSource } from 'typeorm';

const greetingRepositoryProvider = {
  provide: TYPES.UserRepository,
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return new UserRepository(datasource);
  },
};

@Module({
  imports: [typeOrmModuleConfig],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    WelcomeUserUseCase,
    greetingRepositoryProvider,
  ],
})
export class AppModule {}
