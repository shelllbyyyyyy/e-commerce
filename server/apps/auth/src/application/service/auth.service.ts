import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { User, UserService } from '@libs/domain';
import { BcryptService } from '@libs/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly service: UserService,
    private readonly bcrypt: BcryptService,
  ) {}

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const user = await this.service.findByEmailWithPassword(email);
      if (!user) throw new NotFoundException('User not found');

      const compare = await this.bcrypt.comparePassword(
        password,
        user.getPassword(),
      );

      if (!compare) throw new UnauthorizedException('Password not match');

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
