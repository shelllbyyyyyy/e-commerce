import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';

interface ErrorResponse {
  message: string[];
}

@Catch(RpcException)
export class GatewayRpcExceptionFilter
  implements ExceptionFilter<RpcException>
{
  private readonly logger = new Logger(GatewayRpcExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: RpcException, host: ArgumentsHost) {
    const error: any = exception.getError();
    const ctx = host.switchToHttp();
    const data = host.switchToRpc().getData();
    const response = ctx.getResponse<Response>();
    const statusCode = error.response.statusCode;
    const user = data.user?.email;

    this.logger.error(`[${user}]: ${exception.message} `);

    if (statusCode === null) {
      response.status(500).json('Internal Server Error');
    }

    response.status(statusCode).json(error.response);
  }
}
