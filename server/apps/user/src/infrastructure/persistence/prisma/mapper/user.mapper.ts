import { Prisma, User as UserPrisma } from '@prisma/client';

import { User } from '@libs/domain';

export class UserMapper {
  static toPrisma(data: User): Prisma.UserCreateInput {
    return {
      username: data.getUsername(),
      email: data.getEmail(),
      password: data.getPassword(),
      isVerified: data.IsVerified(),
    };
  }

  static toDomain(data: UserPrisma): User {
    return new User(
      data.id,
      data.username,
      data.email,
      undefined,
      data.isVerified,
      data.display_name,
      data.profile_picture,
      data.phone_number,
      data.createdAt,
      data.updatedAt,
    );
  }

  static toDomainWithPassword(data: UserPrisma): User {
    return new User(
      data.id,
      data.username,
      data.email,
      data.password,
      data.isVerified,
      data.display_name,
      data.profile_picture,
      data.phone_number,
      data.createdAt,
      data.updatedAt,
    );
  }
}
