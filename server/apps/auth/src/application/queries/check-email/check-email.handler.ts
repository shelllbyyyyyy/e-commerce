import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CheckEmailQuery } from './check-email.query';
import { User } from '@libs/domain';
import { AuthService } from '../../service/auth.service';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(CheckEmailQuery)
export class CheckEmailHandler implements IQueryHandler<CheckEmailQuery, User> {
  constructor(private readonly authService: AuthService) {}
  async execute(query: CheckEmailQuery): Promise<User> {
    const { email } = query;
    try {
      return await this.authService.checkUser(email);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
