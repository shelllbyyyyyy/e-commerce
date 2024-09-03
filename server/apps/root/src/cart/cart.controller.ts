import { Request, Response } from 'express';
import {
  Body,
  Controller,
  Delete,
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

import { CartService } from './cart.service';

import { ApiResponse } from '../auth/dtos/api-response.dto';
import { AddToCartDTO } from './dtos/add-to-cart.dto';
import { UpdateCartDTO } from './dtos/update-cart.dto';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Ok',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "You don't have a cart",
  })
  async getCart(@Req() req: Request, @Res() res: Response) {
    const access_token = req.headers.authorization;

    const result = await this.cartService.getCart(access_token);

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Your cart', result));
  }

  @Post()
  @ApiBody({ type: AddToCartDTO })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Product has been added to your cart',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "You don't have a cart",
  })
  async addToCart(
    @Body() dto: AddToCartDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const access_token = req.headers.authorization;

    await this.cartService.addToCart(dto, access_token);

    res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          HttpStatus.OK,
          'Product has been added to your cart',
          'OK',
        ),
      );
  }

  @Patch(':cartItemId')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Item updated',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something wrong',
  })
  async updateQuantity(
    @Param('cartItemId') cartItemId: string,
    @Body() dto: UpdateCartDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const access_token = req.headers.authorization;

    await this.cartService.updateCartItem(cartItemId, dto, access_token);

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Item updated', 'OK'));
  }

  @Delete(':cartItemId')
  @ApiOkResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Item deleted',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something wrong',
  })
  async deleteCartItem(
    @Param('cartItemId') cartItemId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const access_token = req.headers.authorization;

    await this.cartService.deleteCartItem(cartItemId, access_token);

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Item deleted', 'OK'));
  }
}
