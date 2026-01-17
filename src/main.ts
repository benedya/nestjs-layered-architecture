import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { isDevelopmentEnv } from './Helper/Env';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (isDevelopmentEnv) {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
