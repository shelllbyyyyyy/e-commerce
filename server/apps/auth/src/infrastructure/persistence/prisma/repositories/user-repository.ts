import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { User, UserRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly service: PrismaService) {}

  async save(data: User): Promise<User> {
    const payload = UserMapper.toPrisma(data);

    const user = await this.service.user.create({ data: payload });

    return UserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.service.user.findUnique({ where: { id } });

    if (!user) return;

    return UserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.service.user.findUnique({ where: { email } });

    if (!user) return;

    return UserMapper.toDomain(user);
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    const user = await this.service.user.findUnique({
      where: { email },
    });

    if (!user) return;

    return UserMapper.toDomainWithPassword(user);
  }

  async verifyUser(id: string): Promise<boolean> {
    const verify = await this.service.user.update({
      where: { id },
      data: { isVerified: true },
    });

    if (verify) return true;
    return false;
  }

  async update(data: User): Promise<User> {
    const payload: Prisma.UserUpdateInput = { ...data };

    const update = await this.service.user.update({
      where: { email: data.getEmail() },
      data: payload,
    });

    return UserMapper.toDomain(update);
  }

  async deleteById(id: string): Promise<boolean> {
    const deleted = await this.service.user.delete({ where: { id } });

    if (!deleted) return false;

    return true;
  }

  async updateById(data: User): Promise<User> {
    const payload: Prisma.UserUpdateInput = { ...data };

    const update = await this.service.user.update({
      where: { id: data.getId() },
      data: payload,
    });

    return UserMapper.toDomain(update);
  }

  async delete(email: string): Promise<void> {
    await this.service.user.delete({ where: { email } });
  }
}
