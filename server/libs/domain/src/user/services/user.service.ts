import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repositories/user-repository';
import { User } from '../entities/user.entity';
import { randomUUID } from 'crypto';

type Register = {
  username: string;
  email: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async save({ email, password, username }: Register): Promise<User> {
    const newUser = User.createUser({
      id: randomUUID(),
      username,
      email,
      password,
      isVerified: false,
    });
    return await this.repository.save(newUser);
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findByEmail(email);
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    return await this.repository.findByEmailWithPassword(email);
  }

  async verifyUser(id: string): Promise<boolean> {
    return await this.repository.verifyUser(id);
  }

  async update(data: User): Promise<User> {
    return await this.repository.update(data);
  }

  async updateById(data: User): Promise<User> {
    return await this.repository.updateById(data);
  }

  async delete(email: string): Promise<void> {
    return await this.repository.delete(email);
  }

  async deleteById(id: string): Promise<boolean> {
    return await this.repository.deleteById(id);
  }
}
