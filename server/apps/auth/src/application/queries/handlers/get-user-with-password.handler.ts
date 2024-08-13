import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User, UserService } from '@libs/domain';

import { GetUserQuery } from '../get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserWithPasswordHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly service: UserService) {}

  async execute(query: GetUserQuery): Promise<User> {
    const { email } = query;

    const user = await this.service.findByEmailWithPassword(email);

    return user;
  }
}
