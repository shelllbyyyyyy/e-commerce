import { Request, Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { InventoryService } from './inventory.service';
import { ApiResponse } from '../auth/dtos/api-response.dto';
import { UpdateInventoryDTO } from './dtos/update-inventory.dto';

@Controller('inventory')
@ApiTags('Inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get()
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Stock product found',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  async getAllStockProduct(@Req() req: Request, @Res() res: Response) {
    const result = await this.service.getAllStockProduct(
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Stock product found', result));
  }

  @Get(':productId')
  @ApiParam({
    name: 'productId',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Stock product found',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  async getStockProduct(
    @Param('productId') productId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.service.getStockProduct(
      productId,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Stock product found', result));
  }

  @Patch(':productId')
  @ApiParam({
    name: 'productId',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Stock product updated',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Update failed',
  })
  async updateStockProduct(
    @Param('productId') productId: string,
    @Body() dto: UpdateInventoryDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.service.updateStockProduct(
      productId,
      dto,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Update successfull', result));
  }
}
