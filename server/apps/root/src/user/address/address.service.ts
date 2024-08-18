import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { USER_SERVICE } from '@libs/shared';
import { Address } from '@libs/domain';
import { AddAddressDTO } from '../dtos/add-address.dto';
import { UpdateAddressDTO } from '../dtos/update-address.dto';

@Injectable()
export class AddressService {
  constructor(@Inject(USER_SERVICE) private rmqClient: ClientProxy) {}

  async addAddress(
    request: AddAddressDTO,
    authentication: string,
  ): Promise<Address> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('add_address', {
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

  async updateAddress(
    param: string,
    request: UpdateAddressDTO,
    authentication: string,
  ): Promise<Address> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('update_address', {
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

  async deleteAddress(param: string, authentication: string): Promise<boolean> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('delete_address', {
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

  async getAddressByUserId(access_token: string): Promise<Address[]> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send<Address[]>('get_address_by_user', {
            access_token: access_token,
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

  async getAddress(param: string, authentication: string): Promise<Address> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('get_address', {
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
