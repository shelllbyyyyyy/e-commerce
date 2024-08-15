import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Req,
  Patch,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { AddAddressDTO } from './dtos/add-address.dto';
import { UpdateAddressDTO } from './dtos/update-address.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse } from '../auth/dtos/api-response.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('address/:id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Address found',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Address not found',
  })
  async getAddress(@Param('id') id: string, @Req() req: Request) {
    const address = await this.userService.getAddress(
      id,
      req.cookies?.access_token,
    );

    if (!address)
      return new ApiResponse(
        HttpStatus.NOT_FOUND,
        'Address not found',
        address,
      );

    return new ApiResponse(HttpStatus.OK, 'Address found', address);
  }

  @Get('address')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Address found',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Address not found',
  })
  async getAddressByUser(@Req() req: Request) {
    const address = await this.userService.getAddressByUser(
      req.cookies?.access_token,
    );

    if (!address)
      return new ApiResponse(
        HttpStatus.NOT_FOUND,
        'Address not found',
        address,
      );

    return new ApiResponse(HttpStatus.OK, 'Address found', address);
  }

  @Post('address')
  @ApiBody({ type: AddAddressDTO })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Add address successfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something Wrong',
  })
  async addAddress(@Body() dto: AddAddressDTO, @Req() req: Request) {
    const address = await this.userService.addAddress(
      dto,
      req.cookies?.access_token,
    );

    if (!address)
      return new ApiResponse(
        HttpStatus.BAD_REQUEST,
        'Something Wrong',
        address,
      );

    return new ApiResponse(
      HttpStatus.CREATED,
      'Add address successfully',
      address,
    );
  }

  @Patch('address/:id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateAddressDTO })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Address has been updated',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something wrong',
  })
  async updateAddress(
    @Param('id') id: string,
    @Body() dto: UpdateAddressDTO,
    @Req() req: Request,
  ) {
    const address = await this.userService.updateAddress(
      id,
      dto,
      req.cookies?.access_token,
    );

    if (!address)
      return new ApiResponse(
        HttpStatus.BAD_REQUEST,
        'Something Wrong',
        address,
      );

    return new ApiResponse(HttpStatus.OK, 'Address has been updated', address);
  }

  @Delete('address/:id')
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Address has been deleted',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something wrong',
  })
  async deleteAddress(@Param('id') id: string, @Req() req: Request) {
    const address = await this.userService.deleteAddress(
      id,
      req.cookies?.access_token,
    );

    if (!address)
      return new ApiResponse(
        HttpStatus.BAD_REQUEST,
        'Something Wrong',
        address,
      );

    return new ApiResponse(
      HttpStatus.NO_CONTENT,
      'Address has been deleted',
      address,
    );
  }
}
