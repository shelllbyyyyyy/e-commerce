import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';

import { Cart, CartService } from '@libs/domain';

import { GetCartQuery } from './get-cart.query';

@QueryHandler(GetCartQuery)
export class GetCartHandler implements IQueryHandler<GetCartQuery, Cart> {
  constructor(private readonly service: CartService) {}

  async execute(query: GetCartQuery): Promise<Cart> {
    const { userId } = query;

    try {
      return await this.service.getCart(userId);
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }
}
