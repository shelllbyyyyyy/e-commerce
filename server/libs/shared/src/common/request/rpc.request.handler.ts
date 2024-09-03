import { Injectable } from '@nestjs/common';

import { Payload } from '../buffer';

type User = {
  email: string;
  sub: string;
};

export class RpcRequest<T = any> {
  constructor(
    public readonly request?: T,
    public readonly param?: string,
    public readonly imageFile?: Payload,
    public readonly authorization?: string,
    public readonly user?: User,
  ) {}
}

@Injectable()
export class RpcRequestHandler {
  static execute<T>(data: any): RpcRequest<T> {
    const { request, param, user, imageFile, authorization } = data || {};
    return new RpcRequest<T>(request, param, imageFile, authorization, user);
  }
}
