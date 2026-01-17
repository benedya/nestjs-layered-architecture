import { Module } from '@nestjs/common';
import { typeOrmModuleConfig } from './Database/TypeORMConfig';
import { ExampleController } from './ApiGateway/ExampleController';
import { SERVICES as USER_SERVICES } from './Module/User';
import { SERVICES as QUOTE_SERVICES } from './Module/Quote';
import { PROVIDERS } from './Provider';

@Module({
  imports: [typeOrmModuleConfig],
  controllers: [ExampleController],
  providers: [...PROVIDERS, ...USER_SERVICES, ...QUOTE_SERVICES],
})
export class AppModule {}
