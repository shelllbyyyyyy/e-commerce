import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { LoginCommand } from './login.command';
import { AuthService } from '../../service/auth.service';

@CommandHandler(LoginCommand)
export class LoginHandler
  implements
    ICommandHandler<
      LoginCommand,
      { access_token: string; refresh_token: string }
    >
{
  constructor(
    private readonly service: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    command: LoginCommand,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = command;

    const user = await this.service.validateUserCredentials(email, password);
    const payload = { name: user.getUsername(), sub: user.getId() };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: '1h',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }
}
