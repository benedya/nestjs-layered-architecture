import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ValidationPipe } from '@nestjs/common';
import { isDevelopmentEnv } from '../Helper/Env';
import cookieParser from 'cookie-parser';
import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

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

  await app.init();
  // await app.listen(80);
  const expressApp = app.getHttpAdapter().getInstance();

  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());

  return server(event, context, callback);
};
