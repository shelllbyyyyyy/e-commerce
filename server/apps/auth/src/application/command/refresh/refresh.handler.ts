import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

import { RefreshCommand } from './refresh.command';

@CommandHandler(RefreshCommand)
export class RefreshHandler
  implements ICommandHandler<RefreshCommand, { access_token: string }>
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: RefreshCommand): Promise<{ access_token: string }> {
    const { refresh_token } = command;

    try {
      const payload = this.jwtService.verify(refresh_token, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });

      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, name: payload.name },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
          expiresIn: '1h',
        },
      );

      return { access_token: newAccessToken };
    } catch (e) {
      throw new RpcException(
        new UnauthorizedException('Invalid or expired refresh token'),
      );
    }
  }
}
