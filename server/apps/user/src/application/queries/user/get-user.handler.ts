import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { User, UserService } from '@libs/domain';
import { NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery, User> {
  constructor(private readonly service: UserService) {}

  async execute(query: GetUserQuery): Promise<User> {
    const { userId } = query;
    try {
      const user = await this.service.findById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new RpcException(new NotFoundException('User not found'));
    }
  }
}
