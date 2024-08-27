import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';

import { User } from '@libs/domain';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserWelcome(user: any, token: string) {
    const confirmation_url = `${this.configService.get('BASE_URL')}/auth/verify-user/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: `no-reply ${this.configService.get('EMAIL_ADMIN')}`,
      subject: 'Welcome to Shelby shop! Confirm your Email',
      template: './verify-account',
      context: {
        name: user.username,
        confirmation_url,
      },
    });
  }

  async resendVerificationUser(user: any, token: string) {
    const confirmation_url = `${this.configService.get('BASE_URL')}/auth/verify-user/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: `no-reply ${this.configService.get('EMAIL_ADMIN')}`,
      subject: 'Welcome to Shelby Shop! Confirm your Email',
      template: './resend-verification',
      context: {
        name: user.username,
        confirmation_url,
      },
    });
  }
}
