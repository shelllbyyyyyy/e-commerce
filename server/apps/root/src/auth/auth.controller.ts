import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

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
  async register(@Body() dto: RegisterDTO): Promise<ApiResponse<User>> {
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
  ): Promise<ApiResponse<{ access_token: string }>> {
    const token = await this.service.login(dto);

    if (!token)
      return new ApiResponse(
        HttpStatus.UNAUTHORIZED,
        'Wrong email/password',
        token,
      );

    return new ApiResponse(HttpStatus.NO_CONTENT, 'Login Successfully', token);
  }
}
