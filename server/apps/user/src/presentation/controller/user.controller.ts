import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

import { Address } from '@libs/domain';
import { JwtAuthGuard, RmqService } from '@libs/shared';

import { AddAddressDTO } from '@/root/user/dtos/add-address.dto';
import { UpdateAddressDTO } from '@/root/user/dtos/update-address.dto';
import { AddAddressCommand } from '@/user/application/command/address/add-address.command';
import { UpdateAddressCommand } from '@/user/application/command/address/update-address.command';
import { DeleteAddressCommand } from '@/user/application/command/address/delete-address.command';
import { FindAddressByUserQuery } from '@/user/application/queries/address/find-address-by-user.query';
import { FindAddressQuery } from '@/user/application/queries/address/find-address.query';

@Controller()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly rmqService: RmqService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @MessagePattern('add_address')
  async handleAddAddress(
    @Payload() data: { request: AddAddressDTO; user: any },
    @Ctx() context: RmqContext,
  ) {
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
    } = data.request;

    const user = data.user;

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
      throw new RpcException({
        message: error.message,
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('update_address')
  async handleUpdateAddress(
    @Payload() data: { request: UpdateAddressDTO; param: any },
    @Ctx() context: RmqContext,
  ) {
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
    } = data.request;

    const id = data.param as string;

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
      throw new RpcException({
        message: error.message,
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('delete_address')
  async handleDeleteAddress(
    @Payload() data: { id: string },
    @Ctx() context: RmqContext,
  ) {
    const command = new DeleteAddressCommand(data.id);

    try {
      const newAddress = await this.commandBus.execute<
        DeleteAddressCommand,
        Address
      >(command);

      this.rmqService.ack(context);

      if (!newAddress) return;

      return newAddress;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('get_address_by_user')
  async handleGetByUserAddress(
    @Payload() data: { user: any },
    @Ctx() context: RmqContext,
  ) {
    const user = data.user;
    try {
      const getAddress = await this.queryBus.execute<
        FindAddressByUserQuery,
        Address[]
      >(new FindAddressByUserQuery(user.sub));

      this.rmqService.ack(context);

      return getAddress;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('get_address')
  async handleGetAddress(
    @Payload() data: { id: string },
    @Ctx() context: RmqContext,
  ) {
    try {
      const getAddress = await this.queryBus.execute<FindAddressQuery, Address>(
        new FindAddressQuery(data.id),
      );

      this.rmqService.ack(context);

      return getAddress;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }
}
