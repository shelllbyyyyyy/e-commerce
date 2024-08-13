import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { User, UserRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { Usermapper } from '../mapper/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly service: PrismaService) {}

  async save(data: User): Promise<User> {
    const payload = Usermapper.toPrisma(data);

    const user = await this.service.user.create({ data: payload });

    return Usermapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.service.user.findUnique({ where: { email } });

    if (!user) return;

    return Usermapper.toDomain(user);
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    const user = await this.service.user.findUnique({
      where: { email },
    });

    if (!user) return;

    return Usermapper.toDomainWithPassword(user);
  }

  async update(data: User): Promise<User> {
    const payload: Prisma.UserUpdateInput = { ...data };

    const update = await this.service.user.update({
      where: { email: data.getEmail() },
      data: payload,
    });

    return Usermapper.toDomain(update);
  }

  async delete(email: string): Promise<void> {
    await this.service.user.delete({ where: { email } });
  }
}
