import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { RmqModule } from '../rmq/rmq.module';
import { AUTH_SERVICE } from '../rmq/services';
import { CookieService } from '../common/compress';

@Module({
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
  providers: [CookieService],
  exports: [RmqModule, CookieService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
