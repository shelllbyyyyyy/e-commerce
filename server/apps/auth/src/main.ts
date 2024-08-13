import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

import { RmqService, AUTH_SERVICE } from '@libs/shared';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice<RmqOptions>(rmqService.getOptions(AUTH_SERVICE));

  await app.init();

  await app.startAllMicroservices();
}

bootstrap();
