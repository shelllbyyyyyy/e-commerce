import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { ApiResponse } from '../auth/dtos/api-response.dto';
import { User } from '@libs/domain';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'User found',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async handleGetUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.getUser(req.cookies.access_token);

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'User found', user));
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'User found',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async handleGetUserById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserById(
      id,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'User found', user));
  }

  @Patch()
  @ApiBody({ type: UpdateUserDTO, required: false })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'User updated',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something wrong',
  })
  async handleUpdate(
    @Body() dto: UpdateUserDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const update = await this.userService.updateUser(
      dto,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'User updated', update));
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deleted',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something wrong',
  })
  async handleDelete(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.userService.deleteUser(id, req.cookies.access_token);

    res.status(HttpStatus.NO_CONTENT);
  }
}
