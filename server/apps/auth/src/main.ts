import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';

import { RmqService, AUTH_SERVICE, RpcExceptionFilter } from '@libs/shared';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);

  // app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<RmqOptions>(rmqService.getOptions(AUTH_SERVICE));

  await app.init();
  await app.startAllMicroservices();
}

bootstrap();
