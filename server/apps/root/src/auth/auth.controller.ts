import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { RegisterDTO } from './dtos/register.dto';
import { ApiResponse } from './dtos/api-response.dto';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { GoogleOauthGuard } from './guard/google-auth.guard';
import { AuthenticatedUser } from '@libs/shared';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @ApiBody({ type: RegisterDTO })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Register successfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email already registered',
  })
  async register(@Body() dto: RegisterDTO, @Res() res: Response) {
    const newUser = await this.service.register(dto);

    res
      .status(HttpStatus.CREATED)
      .json(
        new ApiResponse(HttpStatus.CREATED, 'Register successfully', newUser),
      );
  }

  @Post('login')
  @ApiBody({ type: LoginDTO })
  @ApiNoContentResponse({
    status: HttpStatus.OK,
    description: 'Login Successfully',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Wrong email/password',
  })
  async login(
    @Body() dto: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.service.login(dto);

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 360000,
      path: '/',
    });

    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.status(HttpStatus.OK).send({ message: 'Login Successfully' });
  }

  @Post('logout')
  @ApiNoContentResponse({
    status: HttpStatus.OK,
    description: 'Logout success',
  })
  async logout(@Res() res: Response) {
    res.cookie('access_token', '');
    res.cookie('refresh_token', '');

    res.status(HttpStatus.OK).send({ message: 'Logout success' });
  }

  @Patch('verify-user/:token')
  @ApiParam({ name: 'token' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Account has been verified',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Token has expiren',
  })
  async verifyUser(@Param('token') token: string, @Res() res: Response) {
    const verify = await this.service.verifyUser(token);

    res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(HttpStatus.OK, 'Account has been verified', verify),
      );
  }

  @Post('resend-verification/:email')
  @ApiParam({ name: 'email' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'The Verification link has been sent to your email',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email already registered',
  })
  async resendVerification(
    @Param('email') email: string,
    @Res() res: Response,
  ) {
    const verify = await this.service.resendVerification(email);

    res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          HttpStatus.OK,
          'The Verification link has been sent to your email',
          verify,
        ),
      );
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Google auth succesfull',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something error',
  })
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Google auth succesfull',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something error',
  })
  async callback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as AuthenticatedUser;

    const result = await this.service.googleLogin(user);

    res.redirect(
      `${this.configService.get<string>('CLIENT_URL')}/api/auth/google/callback?access_token=${result.access_token}`,
    );
  }
}
