import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GoogleCommand } from './google.command';
import { AuthService } from '../../service/auth.service';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@libs/domain';
import { randomUUID } from 'crypto';

@CommandHandler(GoogleCommand)
export class GooglerHandler
  implements
    ICommandHandler<
      GoogleCommand,
      { access_token: string; refresh_token: string }
    >
{
  constructor(
    private readonly service: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    command: GoogleCommand,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { req } = command;
    try {
      if (!req.user) {
        return;
      }

      const { email, firstName, lastName, picture } = req.user;
      const user = await this.service.checkUser(email);
      if (!user) {
        const newUser = {
          id: randomUUID(),
          username: firstName + ' ' + lastName,
          email,
          password: randomUUID(),
          isVerified: true,
          display_name: firstName,
          profile_picture: picture,
        };

        await this.service.newUser(newUser);

        const payload = { email: email, sub: newUser.id };

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

      const payload = { email: user.email, sub: user.id };

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
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
