import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter<RpcException> {
  private readonly logger = new Logger(RpcExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    const context = host.switchToRpc();
    const data = context.getData();

    const user = data.user?.email;

    this.logger.error(`[${user}]: ${exception.message} `);
  }
}
