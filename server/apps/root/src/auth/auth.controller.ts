import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { User } from '@libs/domain';

import { RegisterDTO } from './dtos/register.dto';
import { ApiResponse } from './dtos/api-response.dto';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDTO })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Register successfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something Wrong',
  })
  async register(
    @Body() dto: RegisterDTO,
    @Res() res: Response,
  ): Promise<ApiResponse<User>> {
    const newUser = await this.service.register(dto);

    if (!newUser)
      return new ApiResponse(
        HttpStatus.BAD_REQUEST,
        'Something Wrong',
        newUser,
      );

    return new ApiResponse(
      HttpStatus.CREATED,
      'Register successfully',
      newUser,
    );
  }

  @Post('login')
  @ApiBody({ type: LoginDTO })
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Login Successfully',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Wrong email/password',
  })
  async login(
    @Body() dto: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<string>> {
    const result = await this.service.login(dto);

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 360000,
    });

    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    if (!result)
      return new ApiResponse(
        HttpStatus.UNAUTHORIZED,
        'Wrong email/password',
        'Please try again',
      );

    return new ApiResponse(
      HttpStatus.NO_CONTENT,
      'Login Successfully',
      '🔥🔥🔥🔥🔥',
    );
  }

  @Post('refresh')
  @ApiNoContentResponse({
    status: HttpStatus.OK,
    description: 'Access token generated',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No refresh token provided',
  })
  async refresh(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<ApiResponse<string>> {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      return new ApiResponse(
        HttpStatus.UNAUTHORIZED,
        'No refresh token provided',
        '👀',
      );
    }

    const data = await this.service.refresh(refreshToken);

    if (!data) {
      return new ApiResponse(
        HttpStatus.UNAUTHORIZED,
        'No refresh token provided',
        '👀',
      );
    }

    res.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    res.json(
      new ApiResponse(
        HttpStatus.OK,
        'Access token generated successfully',
        '🔥🔥🔥🔥',
      ),
    );
  }
}
