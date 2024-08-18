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
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AddAddressDTO } from '../dtos/add-address.dto';
import { UpdateAddressDTO } from '../dtos/update-address.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ApiResponse } from '@/root/auth/dtos/api-response.dto';
import { AddressService } from './address.service';

@Controller('address')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/:id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Address found',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Address not found',
  })
  async getAddress(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const address = await this.addressService.getAddress(
      id,
      req.cookies?.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Address found', address));
  }

  @Get()
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Address found',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.NOT_FOUND,
    description: "you don't have any address",
  })
  async getAddressByUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const address = await this.addressService.getAddressByUserId(
      req.cookies?.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Address found', address));
  }

  @Post()
  @ApiBody({ type: AddAddressDTO })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Add address successfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something Wrong',
  })
  async addAddress(
    @Body() dto: AddAddressDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const address = await this.addressService.addAddress(
      dto,
      req.cookies?.access_token,
    );

    res
      .status(HttpStatus.CREATED)
      .json(
        new ApiResponse(
          HttpStatus.CREATED,
          'Add address successfully',
          address,
        ),
      );
  }

  @Patch('/:id')
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
    @Res() res: Response,
  ) {
    const address = await this.addressService.updateAddress(
      id,
      dto,
      req.cookies?.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(HttpStatus.OK, 'Address has been updated', address),
      );
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Address has been deleted',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something wrong',
  })
  async deleteAddress(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const deleted = await this.addressService.deleteAddress(
      id,
      req.cookies?.access_token,
    );

    res
      .status(HttpStatus.NO_CONTENT)
      .json(
        new ApiResponse(
          HttpStatus.NO_CONTENT,
          'Address has been deleted',
          deleted,
        ),
      );
  }
}
