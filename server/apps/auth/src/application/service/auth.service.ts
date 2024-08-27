import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { User } from '@libs/domain';
import { BcryptService, USER_SERVICE } from '@libs/shared';

import { RegisterDTO } from '@/root/auth/dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE) private readonly rmqService: ClientProxy,
    private readonly bcrypt: BcryptService,
  ) {}

  async checkUser(param: string) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('existing_user', {
            param,
          })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );

      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async register(request: RegisterDTO) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('create_user', {
            request,
          })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );

      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async verifyUser(param: string) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('verify_user', {
            param,
          })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );

      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async validateUserCredentials(email: string, password: string) {
    const user = await this.checkUser(email);

    if (!user) throw new NotFoundException('User not found');

    const compare = await this.bcrypt.comparePassword(password, user.password);

    if (!compare) throw new UnauthorizedException('Password not match');

    return user;
  }
}
