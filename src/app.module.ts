import { Module } from '@nestjs/common';
import { typeOrmModuleConfig } from './Database/TypeORMConfig';
import { UserController } from './ApiGateway/UI/UserController';
import { SERVICES as USER_SERVICES } from './Module/User';
import { SERVICES as NOTIFICATION_SERVICES } from './Module/Notification';
import { PROVIDERS } from './Provider';

@Module({
  imports: [typeOrmModuleConfig],
  controllers: [UserController],
  providers: [...PROVIDERS, ...USER_SERVICES, ...NOTIFICATION_SERVICES],
})
export class AppModule {}
