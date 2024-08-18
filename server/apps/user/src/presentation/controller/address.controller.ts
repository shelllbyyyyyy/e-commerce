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
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

import { Address } from '@libs/domain';
import {
  JwtAuthGuard,
  RmqService,
  RpcExceptionFilter,
  RpcRequestHandler,
} from '@libs/shared';

import { AddAddressDTO } from '@/root/user/dtos/add-address.dto';
import { UpdateAddressDTO } from '@/root/user/dtos/update-address.dto';
import { AddAddressCommand } from '@/user/application/command/address/add-address.command';
import { UpdateAddressCommand } from '@/user/application/command/address/update-address.command';
import { DeleteAddressCommand } from '@/user/application/command/address/delete-address.command';
import { GetAddressByUserQuery } from '@/user/application/queries/address/get-address-by-user.query';
import { GetAddressQuery } from '@/user/application/queries/address/get-address.query';

@Controller('user/address')
@UseFilters(new RpcExceptionFilter())
export class AddressController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly rmqService: RmqService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @MessagePattern('add_address')
  async handleAddAddress(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute<AddAddressDTO>(data);

    const {
      first_name,
      last_name,
      city,
      country_code,
      phone_number,
      postal_code,
      state,
      street,
      mapUrl,
    } = rpc.request;

    const user = rpc.user;

    const command = new AddAddressCommand(
      user.sub,
      first_name,
      last_name,
      phone_number,
      street,
      city,
      state,
      postal_code,
      country_code,
      mapUrl,
    );

    try {
      const newAddress = await this.commandBus.execute<
        AddAddressCommand,
        Address
      >(command);

      this.rmqService.ack(context);

      if (!newAddress) return;

      return newAddress;
    } catch (error) {
      throw new RpcException(new BadRequestException(error.message));
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('update_address')
  async handleUpdateAddress(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute<UpdateAddressDTO>(data);

    const {
      first_name,
      last_name,
      city,
      country_code,
      phone_number,
      postal_code,
      state,
      street,
      mapUrl,
    } = rpc.request;

    const id = rpc.param;

    const command = new UpdateAddressCommand(
      id,
      first_name,
      last_name,
      phone_number,
      street,
      city,
      state,
      postal_code,
      country_code,
      mapUrl,
    );

    try {
      const newAddress = await this.commandBus.execute<
        UpdateAddressCommand,
        Address
      >(command);

      this.rmqService.ack(context);

      if (!newAddress) return;

      return newAddress;
    } catch (error) {
      throw new RpcException(new BadRequestException(error.message));
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('delete_address')
  async handleDeleteAddress(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute(data);
    const command = new DeleteAddressCommand(rpc.param);

    try {
      const newAddress = await this.commandBus.execute<
        DeleteAddressCommand,
        Address
      >(command);

      this.rmqService.ack(context);

      return newAddress;
    } catch (error) {
      throw new RpcException(
        new BadRequestException('Address already deleted'),
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('get_address_by_user')
  async handleGetByUserAddress(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const rpc = RpcRequestHandler.execute(data);
    const user = rpc.user;
    try {
      const getAddress = await this.queryBus.execute<
        GetAddressByUserQuery,
        Address[]
      >(new GetAddressByUserQuery(user.sub));

      this.rmqService.ack(context);

      return getAddress;
    } catch (error) {
      throw new RpcException(new NotFoundException('Address not found'));
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('get_address')
  async handleGetAddress(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute(data);

    try {
      const getAddress = await this.queryBus.execute<GetAddressQuery, Address>(
        new GetAddressQuery(rpc.param),
      );

      this.rmqService.ack(context);

      return getAddress;
    } catch (error) {
      throw new RpcException(new NotFoundException('Address not found'));
    }
  }
}
