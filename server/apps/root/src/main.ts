import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import { GatewayRpcExceptionFilter } from '@libs/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const httpAdapterHost = app.get(HttpAdapterHost);

  const config = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('Learning microservice with rabbitmq')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalFilters(new GatewayRpcExceptionFilter(httpAdapterHost));

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use(cookieParser());

  SwaggerModule.setup('api/docs', app, document);
  await app.init();
  await app.listen(configService.get('PORT'), '0.0.0.0');
}

bootstrap();
