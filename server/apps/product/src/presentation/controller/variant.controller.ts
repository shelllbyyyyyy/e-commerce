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

import { ProductVariant } from '@libs/domain';
import {
  ConvertBufferService,
  JwtAuthGuard,
  RmqService,
  RpcExceptionFilter,
  RpcRequestHandler,
  VariantMapper,
} from '@libs/shared';
import { AddProductVariantDTO } from '@/root/product/dto/add-product-variant.dto';
import { AddProductVariantCommand } from '@/product/application/command/variant/add-variant.command';
import { DeleteProductVariantCommand } from '@/product/application/command/variant/delete-variant.command';
import { UpdateProductVariantDTO } from '@/root/product/dto/update-product-variant.dto';
import { UpdateProductVariantCommand } from '@/product/application/command/variant/update-variant.command';
import { GetProductVariantByIdQuery } from '@/product/application/queries/variant/get-product-variant-by-id.query';
import { InventoryService } from '@/product/application/service/inventory.service';

@Controller('variant')
@UseFilters(new RpcExceptionFilter())
export class VariantController {
  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus,
    private readonly rmqService: RmqService,
    private readonly bufferService: ConvertBufferService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @MessagePattern('add_product_variant')
  async handleAddProductVariant(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const rpc = RpcRequestHandler.execute<AddProductVariantDTO>(data);
    const { sku, imageUrl, label, price, quantity } = rpc.request;

    const slug = rpc.param;
    const file = this.bufferService.encodeToMulter(rpc.imageFile);

    const command = new AddProductVariantCommand(
      slug,
      price,
      imageUrl,
      sku,
      label,
      quantity,
      file,
      rpc.authorization,
    );

    try {
      const result = await this.command.execute<
        AddProductVariantCommand,
        ProductVariant
      >(command);

      this.rmqService.ack(context);

      const response = VariantMapper.toJson(result);

      return response;
    } catch (error) {
      throw new RpcException(
        new BadRequestException('Add productVariant failed'),
      );
    }
  }

  @MessagePattern('get_product_variant_by_id')
  async handleGetProductVariantBySlug(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const rpc = RpcRequestHandler.execute(data);

    const query = new GetProductVariantByIdQuery(rpc.param);

    try {
      const result = await this.query.execute<
        GetProductVariantByIdQuery,
        ProductVariant
      >(query);
      this.rmqService.ack(context);

      const response = VariantMapper.toJson(result);

      return response;
    } catch (error) {
      throw new RpcException(new NotFoundException('Product not found'));
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('update_product_variant_by_id')
  async handleUpdateProductVariant(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const rpc = RpcRequestHandler.execute<UpdateProductVariantDTO>(data);

    const { label, sku, imageUrl, price } = rpc.request;

    const id = rpc.param;
    const file = this.bufferService.encodeToMulter(rpc.imageFile);

    const command = new UpdateProductVariantCommand(
      id,
      price,
      imageUrl,
      sku,
      label,
      file,
    );

    try {
      const result = await this.command.execute<
        UpdateProductVariantCommand,
        ProductVariant
      >(command);

      this.rmqService.ack(context);

      const response = VariantMapper.toJson(result);

      return response;
    } catch (error) {
      throw new RpcException(
        new BadRequestException('Update productVariant failed'),
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('delete_product_variant_by_id')
  async handleDeleteProductVariant(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const rpc = RpcRequestHandler.execute(data);

    const command = new DeleteProductVariantCommand(rpc.param);

    try {
      const result = await this.command.execute<
        DeleteProductVariantCommand,
        boolean
      >(command);

      this.rmqService.ack(context);

      return result;
    } catch (error) {
      throw new RpcException(
        new BadRequestException('Delete productVariant failed'),
      );
    }
  }
}
