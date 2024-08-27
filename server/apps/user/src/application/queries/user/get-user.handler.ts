import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { User, UserService } from '@libs/domain';

import { GetUserQuery } from './get-user.query';
import { Prisma } from '@prisma/client';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery, User> {
  constructor(private readonly service: UserService) {}

  async execute(query: GetUserQuery): Promise<User> {
    const { userId } = query;
    try {
      return await this.service.findById(userId);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new NotFoundException('User not found'));
      }
    }
  }
}
