import {
  BadRequestException,
  Controller,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CartItemMapper,
  CartMapper,
  JwtAuthGuard,
  RmqService,
  RpcExceptionFilter,
  RpcRequestHandler,
} from '@libs/shared';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { Cart, CartItem } from '@libs/domain';

import { UpdateCartCommand } from '@/cart/application/command/cart/update-cart.command';
import { AddToCartCommand } from '@/cart/application/command/cart/add-to-cart.command';
import { DeleteCartItemCommand } from '@/cart/application/command/cart/delete-cart-item.command';
import { GetCartQuery } from '@/cart/application/queries/cart/get-cart.query';

import { AddToCartDTO } from '@/root/cart/dtos/add-to-cart.dto';
import { UpdateCartDTO } from '@/root/cart/dtos/update-cart.dto';
import { GetCartItemsQuery } from '@/cart/application/queries/cart/get-cart-items.query';
import { DeleteCartItemsCommand } from '@/cart/application/command/cart/delete-cart-items.command';

@Controller('cart')
@UseFilters(new RpcExceptionFilter())
export class CartController {
  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern('get_cart')
  @UseGuards(JwtAuthGuard)
  async handleGetCart(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute(data);

    const query = new GetCartQuery(rpc.user.sub);

    try {
      const result = await this.query.execute<GetCartQuery, Cart>(query);

      this.rmqService.ack(context);

      const response = CartMapper.toJson(result);

      return response;
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }

  @MessagePattern('get_cart_items')
  @UseGuards(JwtAuthGuard)
  async handleGetCartItems(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute<{ cartItemId: string[] }>(data);

    const query = new GetCartItemsQuery(rpc.request.cartItemId);

    try {
      const result = await this.query.execute<GetCartItemsQuery, CartItem[]>(
        query,
      );

      this.rmqService.ack(context);

      const response = result.map((value) => CartItemMapper.toJson(value));

      return response;
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }

  @MessagePattern('add_to_cart')
  @UseGuards(JwtAuthGuard)
  async handleAddToCart(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute<AddToCartDTO>(data);

    const { productId, quantity } = rpc.request;

    const command = new AddToCartCommand(
      rpc.user.sub,
      productId,
      quantity,
      rpc.authorization,
    );

    try {
      const result = await this.command.execute<AddToCartCommand, CartItem>(
        command,
      );

      this.rmqService.ack(context);

      return result;
    } catch (error) {
      throw new RpcException(new BadRequestException('Insufficient stock'));
    }
  }

  @MessagePattern('update_cart_item')
  @UseGuards(JwtAuthGuard)
  async handleUpdateCart(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute<UpdateCartDTO>(data);

    const cartItemId = rpc.param;

    const { quantity } = rpc.request;

    const command = new UpdateCartCommand(
      cartItemId,
      quantity,
      rpc.authorization,
    );

    try {
      const result = await this.command.execute<UpdateCartCommand, CartItem>(
        command,
      );

      this.rmqService.ack(context);

      return result;
    } catch (error) {
      throw new RpcException(new BadRequestException('Insufficient stock'));
    }
  }

  @MessagePattern('delete_cart_item')
  @UseGuards(JwtAuthGuard)
  async handleDeleteCartItem(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute(data);

    const command = new DeleteCartItemCommand(rpc.param);

    try {
      const result = await this.command.execute<DeleteCartItemCommand, boolean>(
        command,
      );

      this.rmqService.ack(context);

      return result;
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }

  @MessagePattern('delete_cart_items')
  @UseGuards(JwtAuthGuard)
  async handleDeleteCartItems(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const rpc = RpcRequestHandler.execute<{ cartItemId: string[] }>(data);

    const command = new DeleteCartItemsCommand(rpc.request.cartItemId);

    try {
      const result = await this.command.execute<
        DeleteCartItemsCommand,
        boolean
      >(command);

      this.rmqService.ack(context);

      return result;
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }
}
