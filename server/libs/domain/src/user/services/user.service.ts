import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repositories/user-repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async save(data: User): Promise<User> {
    return await this.repository.save(data);
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
