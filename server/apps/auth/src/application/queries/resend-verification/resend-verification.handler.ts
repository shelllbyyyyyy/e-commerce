import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@libs/domain';
import { EmailService } from '@libs/shared';

import { ResendVerificationQuery } from './resend-varification.query';

@QueryHandler(ResendVerificationQuery)
export class ResendVerificationHandler
  implements IQueryHandler<ResendVerificationQuery, boolean>
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly sendEmail: EmailService,
  ) {}

  async execute(query: ResendVerificationQuery): Promise<boolean> {
    const { email } = query;

    try {
      const user = await this.userService.findByEmail(email);

      if (user) {
        const payload = { sub: user.getId() };

        const token = await this.jwtService.signAsync(payload, {
          expiresIn: '1m',
          secret: this.configService.get<string>('VERIFY_TOKEN_SECRET'),
        });
        await this.sendEmail.resendVerificationUser(user, token);
      }

      return true;
    } catch (error) {
      throw new RpcException(new BadRequestException('User not found'));
    }
  }
}
