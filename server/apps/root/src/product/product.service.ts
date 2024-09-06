import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { Payload, PRODUCT_SERVICE } from '@libs/shared';
import { Product, ProductVariant } from '@libs/domain';

import { AddProductDTO } from './dto/add-product.dto';
import { UpdateProductDTO } from './dto/update-product-dto';
import { AddProductVariantDTO } from './dto/add-product-variant.dto';
import { UpdateProductVariantDTO } from './dto/update-product-variant.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly rmqClient: ClientProxy,
  ) {}
  async addProduct(
    request: AddProductDTO,
    imageFile: Payload,
    authentication: string,
  ): Promise<Product> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('add_product', {
            request,
            imageFile,
            access_token: authentication,
          })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async getAllProduct(): Promise<Product[]> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('get_all_product', {})
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async getProductBySlug(param: string): Promise<Product> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('get_product_by_slug', { param })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async getProductById(param: string): Promise<Product> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('get_product_by_id', { param })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async updateProductBySlug(
    param: string,
    request: UpdateProductDTO,
    authentication: string,
  ): Promise<Product> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('update_product_by_slug', {
            param,
            request,
            access_token: authentication,
          })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async deleteProductBySlug(
    param: string,
    authentication: string,
  ): Promise<boolean> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('delete_product_by_slug', {
            param,
            access_token: authentication,
          })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async addProductVariant(
    param: string,
    request: AddProductVariantDTO,
    imageFile: Payload,
    authentication: string,
  ): Promise<ProductVariant> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('add_product_variant', {
            param,
            request,
            imageFile,
            access_token: authentication,
          })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async getProductVariantById(param: string): Promise<ProductVariant> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('get_product_variant_by_id', { param })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async updateProductVariantById(
    param: string,
    request: UpdateProductVariantDTO,
    imageFile: Payload,
    authentication: string,
  ): Promise<ProductVariant> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('update_product_variant_by_id', {
            param,
            request,
            imageFile,
            access_token: authentication,
          })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async deleteProductVariantById(
    param: string,
    authentication: string,
  ): Promise<boolean> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('delete_product_variant_by_id', {
            param,
            access_token: authentication,
          })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }
}
