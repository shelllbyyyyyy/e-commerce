import { Injectable } from '@nestjs/common';

type User = {
  email: string;
  sub: string;
};

export class RpcRequest<T = any> {
  constructor(
    public readonly request?: T,
    public readonly param?: string,
    public readonly user?: User,
  ) {}
}

@Injectable()
export class RpcRequestHandler {
  static execute<T>(data: any): RpcRequest<T> {
    const { request, param, user } = data || {};
    return new RpcRequest<T>(request, param, user);
  }
}
