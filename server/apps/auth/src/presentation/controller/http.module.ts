import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import * as cookieParser from 'cookie-parser';

import { RmqModule } from '@libs/shared';

import { AuthController } from './auth.controller';

import { ApplicationModule } from '@/auth/application/application.module';
import { JwtStrategy } from '@/auth/common/strategies/jwt.strategy';
import { LocalStrategy } from '@/auth/common/strategies/local.strategy';
import { LocalAuthGuard } from '@/auth/common/guards/local-auth.guard';
import { JwtAuthGuard } from '@/auth/common/guards/jwt-auth.guard';

@Module({
  imports: [ApplicationModule, RmqModule, CqrsModule],
  providers: [JwtStrategy, LocalStrategy, LocalAuthGuard, JwtAuthGuard],
  controllers: [AuthController],
  exports: [LocalAuthGuard, JwtAuthGuard],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
