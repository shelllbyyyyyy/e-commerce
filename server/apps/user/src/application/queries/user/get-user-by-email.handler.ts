import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { User, UserService } from '@libs/domain';
import { GetUserByEmailQuery } from './get-user-by-email.query';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery, User>
{
  constructor(private readonly service: UserService) {}

  async execute(query: GetUserByEmailQuery): Promise<User> {
    const { email } = query;
    try {
      return await this.service.findByEmailWithPassword(email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new NotFoundException('User not found'));
      }
    }
  }
}
