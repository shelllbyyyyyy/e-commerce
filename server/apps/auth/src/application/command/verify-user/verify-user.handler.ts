import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';

import { UserService } from '@libs/domain';

import { VerifyUserCommand } from './verify-user.command';

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler
  implements ICommandHandler<VerifyUserCommand, boolean>
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: VerifyUserCommand): Promise<boolean> {
    const { token } = command;
    try {
      const decode = await this.jwtService.verify(token, {
        secret: this.configService.get<string>('VERIFY_TOKEN_SECRET'),
      });

      await this.userService.verifyUser(decode.sub);

      return true;
    } catch (error) {
      throw new RpcException(new BadRequestException('Token has expired'));
    }
  }
}
