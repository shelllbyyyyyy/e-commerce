import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User, UserService } from '@libs/domain';
import { NotFoundException } from '@nestjs/common';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler
  implements IQueryHandler<GetUserByIdQuery, User>
{
  constructor(private readonly service: UserService) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const { id } = query;
    try {
      const user = await this.service.findById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new RpcException(new NotFoundException('User not found'));
    }
  }
}
