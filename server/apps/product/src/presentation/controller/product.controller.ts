import {
  BadRequestException,
  Controller,
  NotFoundException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

import { AddProductCommand } from '@/product/application/command/product/add-product.command';
import { DeleteProductCommand } from '@/product/application/command/product/delete-product.command';
import { UpdateProductCommand } from '@/product/application/command/product/update-product.command';
import { GetProductBySlugQuery } from '@/product/application/queries/product/get-product-by-slug.query';
import { GetAllProductQuery } from '@/product/application/queries/product/get-all-product.query';
import { GetProductByIdQuery } from '@/product/application/queries/product/get-product-by-id.query';

import { AddProductDTO } from '@/root/product/dto/add-product.dto';
import { UpdateProductDTO } from '@/root/product/dto/update-product-dto';

import { Product } from '@libs/domain';
import {
  ConvertBufferService,
  JwtAuthGuard,
  ProductMapper,
  RmqService,
  RpcExceptionFilter,
  RpcRequestHandler,
} from '@libs/shared';

import { InventoryService } from '@/product/application/service/inventory.service';

@Controller('product')
@UseFilters(new RpcExceptionFilter())
export class ProductController {
  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus,
    private readonly rmqService: RmqService,
    private readonly bufferService: ConvertBufferService,
    private readonly inventoryService: InventoryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @MessagePattern('add_product')
  async handleAddProduct(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute<AddProductDTO>(data);

    const {
      name,
      slug,
      sku,
      category,
      description,
      imageUrl,
      label,
      price,
      quantity,
    } = rpc.request;

    const file = this.bufferService.encodeToMulter(rpc.imageFile);

    const command = new AddProductCommand(
      name,
      description,
      price,
      slug,
      imageUrl,
      sku,
      category,
      label,
      file,
    );

    try {
      const result = await this.command.execute<AddProductCommand, Product>(
        command,
      );

      this.rmqService.ack(context);

      const variantId = result.getVariant()[0].getId();

      await this.inventoryService.addToInventory(
        variantId,
        { quantity },
        data.access_token,
      );

      const response = ProductMapper.toJson(result);

      return response;
    } catch (error) {
      throw new RpcException(new BadRequestException('Add product failed'));
    }
  }

  @MessagePattern('get_all_product')
  async handleGetAllProduct(@Payload() data: any, @Ctx() context: RmqContext) {
    const query = new GetAllProductQuery();
    try {
      const result = await this.query.execute<GetAllProductQuery, Product[]>(
        query,
      );
      this.rmqService.ack(context);

      const response = result.map((value) => ProductMapper.toJson(value));

      return response;
    } catch (error) {
      throw new RpcException(new NotFoundException('Product not found'));
    }
  }

  @MessagePattern('get_product_by_slug')
  async handleGetProductBySlug(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const rpc = RpcRequestHandler.execute(data);

    const query = new GetProductBySlugQuery(rpc.param);

    try {
      const result = await this.query.execute<GetProductBySlugQuery, Product>(
        query,
      );
      this.rmqService.ack(context);

      const response = ProductMapper.toJson(result);

      return response;
    } catch (error) {
      throw new RpcException(new NotFoundException('Product not found'));
    }
  }

  @MessagePattern('get_product_by_id')
  async handleGetProductById(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute(data);

    const query = new GetProductByIdQuery(rpc.param);

    try {
      const result = await this.query.execute<GetProductByIdQuery, Product>(
        query,
      );
      this.rmqService.ack(context);

      const response = ProductMapper.toJson(result);

      return response;
    } catch (error) {
      throw new RpcException(new NotFoundException('Product not found'));
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('update_product')
  async handleUpdateProduct(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute<UpdateProductDTO>(data);

    const { name, slug, description, imageUrl, price } = rpc.request;

    const command = new UpdateProductCommand(
      name,
      description,
      price,
      slug,
      imageUrl,
    );

    try {
      const result = await this.command.execute<UpdateProductCommand, Product>(
        command,
      );

      this.rmqService.ack(context);

      const response = ProductMapper.toJson(result);

      return response;
    } catch (error) {
      throw new RpcException(new BadRequestException('Update product failed'));
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('delete_product_by_slug')
  async handleDeleteProduct(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute(data);

    const command = new DeleteProductCommand(rpc.param);

    try {
      const result = await this.command.execute<DeleteProductCommand, boolean>(
        command,
      );

      this.rmqService.ack(context);

      return result;
    } catch (error) {
      throw new RpcException(new BadRequestException('Delete product failed'));
    }
  }
}
