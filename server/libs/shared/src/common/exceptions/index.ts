import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof RpcException) {
      response.status(400).json({
        statusCode: 400,
        message: exception.message,
      });
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    } else {
      response.status(500).json({
        statusCode: 500,
        message: new InternalServerErrorException().message,
      });
    }
  }
}
