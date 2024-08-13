import { Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';

@Injectable()
export abstract class UserRepository {
  abstract save(data: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findByEmailWithPassword(email: string): Promise<User>;
  abstract update(data: User): Promise<User>;
  abstract delete(email: string): Promise<void>;
}
