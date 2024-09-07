import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { AUTH_SERVICE, CookieService, RmqModule } from '@libs/shared';

import { AuthService } from '../auth/auth.service';
import { RefreshTokenMiddleware } from './middleware.service';

@Module({
  imports: [
    RmqModule.register({
      name: AUTH_SERVICE,
    }),
  ],
  providers: [AuthService, CookieService],
})
export class RefreshModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RefreshTokenMiddleware)
      .forRoutes(
        { path: '/cart/*', method: RequestMethod.ALL },
        { path: '/order/*', method: RequestMethod.ALL },
        { path: '/address/*', method: RequestMethod.ALL },
        { path: '/user/*', method: RequestMethod.ALL },
        { path: '/inventory/*', method: RequestMethod.ALL },
        { path: '/product/*', method: RequestMethod.POST },
        { path: '/product/*', method: RequestMethod.PUT },
        { path: '/product/*', method: RequestMethod.PATCH },
        { path: '/product/*', method: RequestMethod.DELETE },
      );
  }
}
