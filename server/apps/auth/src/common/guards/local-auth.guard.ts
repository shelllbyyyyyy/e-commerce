import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const requestType = context.getType();

    if (requestType === 'http') {
      return super.canActivate(context);
    } else if (requestType === 'rpc') {
      const rpcData = context.switchToRpc().getData();
      return this.validateRpcRequest(rpcData);
    }
  }

  private async validateRpcRequest(rpcData: any): Promise<boolean> {
    const { email, password } = rpcData;
    if (!email || !password) {
      return false;
    }
    return true;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
