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
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { OrderService } from './order.service';
import { ApiResponse } from '../auth/dtos/api-response.dto';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'List of your order',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Somthing wrong',
  })
  async getOrder(@Req() req: Request, @Res() res: Response) {
    const result = await this.orderService.getOrder(req.cookies.access_token);

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'List of your order', result));
  }

  @Get(':orderId')
  @ApiParam({
    name: 'orderId',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Your order',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Somthing wrong',
  })
  async getOrderById(
    @Param('orderId') orderId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.orderService.getOrderById(
      orderId,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Your order', result));
  }

  @Post()
  @ApiBody({
    type: CreateOrderDTO,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Your order has been created',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Somthing wrong',
  })
  async createOrder(
    @Body() dto: CreateOrderDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.orderService.createOrder(
      dto,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.CREATED)
      .json(
        new ApiResponse(
          HttpStatus.CREATED,
          'Your order has been created',
          result,
        ),
      );
  }

  @Patch(':orderId')
  @ApiParam({
    name: 'orderId',
  })
  @ApiBody({
    type: UpdateOrderDTO,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Order updated',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Somthing wrong',
  })
  async updateOrder(
    @Param('orderId') orderId: string,
    @Body() dto: UpdateOrderDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.orderService.updateOrder(
      orderId,
      dto,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Order updated', result));
  }
}
