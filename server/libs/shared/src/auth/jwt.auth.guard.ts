import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../rmq/services';
import { CookieService } from '../common/compress';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE) private authClient: ClientProxy,
    private readonly cookieService: CookieService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const t = this.getAuthentication(context);

    const token = await this.cookieService.decompressToken(t);
    try {
      await lastValueFrom(
        this.authClient
          .send('validate_user', {
            access_token: token,
          })
          .pipe(
            tap((res) => {
              this.addUser(res, context);
            }),
            catchError(() => {
              throw new RpcException(
                new UnauthorizedException(
                  'To access this you have to login first',
                ),
              );
            }),
          ),
      );

      return true;
    } catch (error) {
      throw new RpcException(
        new UnauthorizedException('To access this you have to login first'),
      );
    }
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication: string;
    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().access_token;
    } else if (context.getType() === 'http') {
      authentication = context.switchToHttp().getRequest()
        .cookies?.access_token;
    }
    if (!authentication) {
      throw new RpcException(
        new UnauthorizedException('To access this you have to login first'),
      );
    }

    return authentication;
  }

  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}
