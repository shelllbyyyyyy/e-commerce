import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { User, UserService } from '@libs/domain';

import { BcryptService } from '@libs/shared';

import { LoginCommand } from '../login.command';

@CommandHandler(LoginCommand)
export class LoginHandler
  implements ICommandHandler<LoginCommand, { access_token: string }>
{
  constructor(
    private readonly service: UserService,
    private readonly bcrypt: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly event: EventBus,
  ) {
    console.log('LoginHandler instantiated');
  }

  async execute(command: LoginCommand): Promise<{ access_token: string }> {
    const { email, password } = command;

    const user = await this.validateUserCredentials(email, password);
    const payload = { name: user.getUsername(), sub: user.getId() };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: '1m',
    });

    this.event.publish(access_token);

    return {
      access_token: access_token,
    };
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.service.findByEmailWithPassword(email);
    if (!user) throw new NotFoundException();

    const compare = await this.bcrypt.comparePassword(
      password,
      user.getPassword(),
    );
    if (!compare) throw new UnauthorizedException('Password not match');

    return user;
  }
}
