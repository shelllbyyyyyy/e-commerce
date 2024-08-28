import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';

import { CartItem, CartService } from '@libs/domain';

import { GetCartItemsQuery } from './get-cart-items.query';

@QueryHandler(GetCartItemsQuery)
export class GetCartItemsHandler
  implements IQueryHandler<GetCartItemsQuery, CartItem[]>
{
  constructor(private readonly service: CartService) {}

  async execute(query: GetCartItemsQuery): Promise<CartItem[]> {
    const { cartItemId } = query;

    try {
      return await this.service.getCartItems(cartItemId);
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }
}
