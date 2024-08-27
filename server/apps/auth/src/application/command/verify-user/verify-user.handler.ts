import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';

import { VerifyUserCommand } from './verify-user.command';
import { AuthService } from '../../service/auth.service';

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler
  implements ICommandHandler<VerifyUserCommand, boolean>
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: VerifyUserCommand): Promise<boolean> {
    const { token } = command;
    try {
      const decode = await this.jwtService.verify(token, {
        secret: this.configService.get<string>('VERIFY_TOKEN_SECRET'),
      });

      await this.authService.verifyUser(decode.sub);

      return true;
    } catch (error) {
      throw new RpcException(new BadRequestException('Token has expired'));
    }
  }
}
