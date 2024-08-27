import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

import { EmailService } from '@libs/shared';

import { ResendVerificationQuery } from './resend-varification.query';
import { AuthService } from '../../service/auth.service';

@QueryHandler(ResendVerificationQuery)
export class ResendVerificationHandler
  implements IQueryHandler<ResendVerificationQuery, boolean>
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly sendEmail: EmailService,
    private readonly authService: AuthService,
  ) {}

  async execute(query: ResendVerificationQuery): Promise<boolean> {
    const { email } = query;

    try {
      const user = await this.authService.checkUser(email);

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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new BadRequestException('User not found'));
      }
    }
  }
}
