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

import { User } from '@libs/domain';
import {
  ConvertBufferService,
  JwtAuthGuard,
  RmqService,
  RpcExceptionFilter,
  RpcRequestHandler,
} from '@libs/shared';

import { UpdateUserDTO } from '@/root/user/dtos/update-user.dto';

import { GetUserQuery } from '@/user/application/queries/user/get-user.query';
import { GetUserByIdQuery } from '@/user/application/queries/user/get-user-by-id.query';
import { UpdateUserCommand } from '@/user/application/command/user/update-user.command';
import { DeleteUserCommand } from '@/user/application/command/user/delete-user.command';

@Controller('user')
@UseFilters(new RpcExceptionFilter())
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly rmqService: RmqService,
    private readonly bufferService: ConvertBufferService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @MessagePattern('get_user_by_id')
  async handleGetUserById(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute(data);

    const id = rpc.param;

    const query = new GetUserByIdQuery(id);

    try {
      const user = await this.queryBus.execute<GetUserByIdQuery, User>(query);

      this.rmqService.ack(context);

      return user;
    } catch (error) {
      throw new RpcException(new NotFoundException('User not found'));
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('get_user')
  async handleGetUser(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute(data);
    const user = rpc.user;

    const query = new GetUserQuery(user.sub);

    try {
      const user = await this.queryBus.execute<GetUserQuery, User>(query);

      this.rmqService.ack(context);

      return user;
    } catch (error) {
      throw new RpcException(new BadRequestException('Something wrong'));
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('update_user')
  async handleUpdateUser(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute<UpdateUserDTO>(data);
    const { display_name, phone_number, profile_picture } = rpc.request;

    const user = rpc.user;
    const file = this.bufferService.encodeToMulter(rpc.imageFile);

    const command = new UpdateUserCommand(
      user.sub,
      display_name,
      phone_number,
      profile_picture,
      file,
    );

    try {
      const updateUser = await this.commandBus.execute<UpdateUserCommand, User>(
        command,
      );

      this.rmqService.ack(context);

      return updateUser;
    } catch (error) {
      throw new RpcException(new BadRequestException('Update user failed'));
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('delete_user')
  async handleDeleteUser(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute(data);
    const command = new DeleteUserCommand(rpc.param);

    try {
      const newAddress = await this.commandBus.execute<
        DeleteUserCommand,
        boolean
      >(command);

      this.rmqService.ack(context);

      return newAddress;
    } catch (error) {
      throw new RpcException(new BadRequestException('Delete user failed'));
    }
  }
}
