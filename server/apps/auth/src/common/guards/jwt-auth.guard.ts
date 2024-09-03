import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() === 'rpc') {
      const rpcData = context.switchToRpc().getData();
      const token = this.extractTokenFromRpc(rpcData);

      if (!token) {
        throw new UnauthorizedException('Missing or invalid token');
      }

      rpcData.headers = { authorization: `Bearer ${token}` };
    } else if (context.getType() === 'http') {
      return super.canActivate(context);
    }

    return super.canActivate(context);
  }

  private extractTokenFromRpc(data: any): string | null {
    const authorizationHeader =
      data?.authorization || data?.headers?.authorization;

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      return authorizationHeader.split(' ')[1];
    }

    return null;
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
