import { Request, Response } from 'express';
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
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ChargeDTO } from '../dtos/charge.dto';
import { ApiResponse } from '@/root/auth/dtos/api-response.dto';
import { UpdateOrderDTO } from '../dtos/update-order.dto';
import { OrderService } from '../order.service';
import { MidtransNotificationDto } from '../dtos/notification.dto';

@Controller('payment')
@ApiTags('Payments')
export class PaymentController {
  constructor(private readonly paymentService: OrderService) {}

  @Post()
  @ApiBody({
    type: ChargeDTO,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Your order is waiting to be paid',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Somthing wrong',
  })
  async payOrder(
    @Body() dto: ChargeDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.paymentService.payOrder(
      dto,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          HttpStatus.OK,
          'Your order is waiting to be paid',
          result,
        ),
      );
  }

  @Post('notification')
  @ApiBody({
    type: MidtransNotificationDto,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Your billing has been paid',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Somthing wrong',
  })
  async updateBilling(
    @Body() dto: MidtransNotificationDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.paymentService.updateBilling(dto);

    res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(HttpStatus.OK, 'Your billing has been paid', result),
      );
  }
}
