import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

import { Address } from '@libs/domain';
import { RmqService } from '@libs/shared';

import { AddAddressDTO } from '@/root/user/dtos/add-address.dto';
import { UpdateAddressDTO } from '@/root/user/dtos/update-address.dto';

import { CurrentUser } from '@/auth/common/decorators/current.user.decorator';
import { AddAddressCommand } from '@/auth/application/command/address/add-address.command';
import { JwtAuthGuard } from '@/auth/common/guards/jwt-auth.guard';
import { DeleteAddressCommand } from '@/auth/application/command/address/delete-address.command';
import { UpdateAddressCommand } from '@/auth/application/command/address/update-address.command';
import { FindAddressQuery } from '@/auth/application/queries/address/find-address.query';
import { FindAddressByUserQuery } from '@/auth/application/queries/address/find-address-by-user.query';

@Controller()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly rmqService: RmqService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @EventPattern('add_address')
  async handleAddAddress(
    @Payload() dto: AddAddressDTO,
    @Ctx() context: RmqContext,
    @CurrentUser() user: any,
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
    } = (dto as any).request;

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
  @EventPattern('update_address')
  async handleUpdateAddress(
    @Payload() dto: UpdateAddressDTO,
    @Ctx() context: RmqContext,
    @CurrentUser() user: any,
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
    } = (dto as any).request;

    const id = (dto as any).param as string;

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
  @EventPattern('delete_address')
  async handleDeleteAddress(
    @Payload() data: { id: string },
    @Ctx() context: RmqContext,
    @CurrentUser() user: any,
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
  @EventPattern('get_address_by_user')
  async handleGetByUserAddress(
    @Ctx() context: RmqContext,
    @CurrentUser() user: any,
  ) {
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
  @EventPattern('get_address')
  async handleGetAddress(
    @Payload() data: { id: string },
    @Ctx() context: RmqContext,
    @CurrentUser() user: any,
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
