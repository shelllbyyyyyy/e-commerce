import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
// import { CommandBus } from '@nestjs/cqrs';

import { User, UserService } from '@libs/domain';
import { BcryptService } from '@libs/shared';

// import { LoginCommand } from '../command/login.command';
// import { RegisterUserCommand } from '../command/register-user.command';

@Injectable()
export class AuthService {
  constructor(
    // private readonly command: CommandBus,
    private readonly service: UserService,
    private readonly bcrypt: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUserCredentials(email, password);
    const payload = { name: user.getUsername(), sub: user.getId() };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: '1m',
    });

    return {
      access_token: access_token,
    };
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const user = await this.service.findByEmailWithPassword(email);
      if (!user) throw new NotFoundException();

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

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const id = randomUUID();
    const hashPassword = await this.bcrypt.hashPassword(password);

    try {
      const existingUser = await this.service.findByEmail(email);
      if (existingUser) {
        throw new UnprocessableEntityException('Email already registered');
      }

      const newUser = new User(id, username, email, hashPassword);

      return await this.service.save(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  // async login(
  //   email: string,
  //   password: string,
  // ): Promise<{ access_token: string }> {
  //   return await this.command.execute<LoginCommand, { access_token: string }>(
  //     new LoginCommand(email, password),
  //   );
  // }

  // async register(
  //   username: string,
  //   email: string,
  //   password: string,
  // ): Promise<User> {
  //   return await this.command.execute<RegisterUserCommand, User>(
  //     new RegisterUserCommand(username, email, password),
  //   );
  // }
}
