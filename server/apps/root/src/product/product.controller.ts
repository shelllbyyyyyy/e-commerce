import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ConvertBufferService } from '@libs/shared';

import { ProductService } from './product.service';
import { AddProductDTO } from './dto/add-product.dto';
import { ApiResponse } from '../auth/dtos/api-response.dto';
import { UpdateProductDTO } from './dto/update-product-dto';
import { AddProductVariantDTO } from './dto/add-product-variant.dto';
import { UpdateProductVariantDTO } from './dto/update-product-variant.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly bufferService: ConvertBufferService,
  ) {}

  @Post()
  @ApiBody({ type: AddProductDTO })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Add product has been successfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Somthing wrong',
  })
  @UseInterceptors(FileInterceptor('imageFile'))
  async addProduct(
    @Body() dto: AddProductDTO,
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
        fileIsRequired: true,
      }),
    )
    imageFile: Express.Multer.File,
  ) {
    const payload = this.bufferService.decodeFromMulter(imageFile);

    const result = await this.productService.addProduct(
      dto,
      payload,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          HttpStatus.OK,
          'Add product has been successfully',
          result,
        ),
      );
  }

  @Get()
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Product found',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Somthing wrong',
  })
  async getAllProduct(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.productService.getAllProduct();

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Product found', result));
  }

  @Patch(':slug')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Product updated',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Somthing wrong',
  })
  async updateProductBySlug(
    @Param('slug') slug: string,
    @Body() dto: UpdateProductDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.productService.updateProductBySlug(
      slug,
      dto,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Product updated', result));
  }

  @Get('/:slug')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Product found',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Somthing wrong',
  })
  async getProductBySlug(
    @Param('slug') slug: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.productService.getProductBySlug(slug);

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Product found', result));
  }

  @Get(':id')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Product found',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Somthing wrong',
  })
  async getProductById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.productService.getProductById(id);

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Product found', result));
  }

  @Delete(':slug')
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete Product has been successfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Somthing wrong',
  })
  async deleteProductBySlug(
    @Param('slug') slug: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.productService.deleteProductBySlug(
      slug,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.NO_CONTENT)
      .json(
        new ApiResponse(
          HttpStatus.NO_CONTENT,
          'Product has been deleted',
          result,
        ),
      );
  }

  @Post(':slug/variant')
  @ApiParam({ name: 'slug' })
  @ApiBody({ type: AddProductVariantDTO })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Add product variant has been successfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Somthing wrong',
  })
  @UseInterceptors(FileInterceptor('imageFile'))
  async addProductVaiant(
    @Param('slug') slug: string,
    @Body() dto: AddProductVariantDTO,
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
        fileIsRequired: true,
      }),
    )
    imageFile: Express.Multer.File,
  ) {
    const payload = this.bufferService.decodeFromMulter(imageFile);

    const result = await this.productService.addProductVariant(
      slug,
      dto,
      payload,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          HttpStatus.OK,
          'Add product variant has been successfully',
          result,
        ),
      );
  }

  @Get('variant/:id')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Product found',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Somthing wrong',
  })
  async getProductVariantById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.productService.getProductVariantById(id);

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Product found', result));
  }

  @Patch('variant/:id')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Product updated',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Somthing wrong',
  })
  async updateProductVariantById(
    @Param('id') id: string,
    @Body() dto: UpdateProductVariantDTO,
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

    const result = await this.productService.updateProductVariantById(
      id,
      dto,
      payload,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, 'Product updated', result));
  }

  @Delete('variant/:id')
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete Product variant has been successfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Somthing wrong',
  })
  async deleteProductVariantById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.productService.deleteProductVariantById(
      id,
      req.cookies.access_token,
    );

    res
      .status(HttpStatus.NO_CONTENT)
      .json(
        new ApiResponse(
          HttpStatus.NO_CONTENT,
          'Product has been deleted',
          result,
        ),
      );
  }
}
