import { Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';

@Injectable()
export abstract class UserRepository {
  abstract save(data: User): Promise<User>;
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findByEmailWithPassword(email: string): Promise<User>;
  abstract verifyUser(id: string): Promise<boolean>;
  abstract update(data: User): Promise<User>;
  abstract updateById(data: User): Promise<User>;
  abstract delete(email: string): Promise<void>;
  abstract deleteById(id: string): Promise<boolean>;
}
