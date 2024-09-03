import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Patch,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { ConvertBufferService } from '@libs/shared';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bufferService: ConvertBufferService,
  ) {}

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
    const user = await this.userService.getUser(req.headers.authorization);

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
      req.headers.authorization,
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
  @UseInterceptors(FileInterceptor('avatar'))
  async handleUpdate(
    @Body() dto: UpdateUserDTO,
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
        fileIsRequired: false,
      }),
    )
    imageFile?: Express.Multer.File,
  ) {
    const payload = this.bufferService.decodeFromMulter(imageFile);

    const update = await this.userService.updateUser(
      dto,
      payload,
      req.headers.authorization,
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
    await this.userService.deleteUser(id, req.headers.authorization);

    res.status(HttpStatus.NO_CONTENT);
  }
}
