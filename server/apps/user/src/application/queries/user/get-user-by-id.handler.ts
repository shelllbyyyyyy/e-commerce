import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { User, UserService } from '@libs/domain';

import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler
  implements IQueryHandler<GetUserByIdQuery, User>
{
  constructor(private readonly service: UserService) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const { id } = query;
    try {
      return await this.service.findById(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new NotFoundException('User not found'));
      }
    }
  }
}
