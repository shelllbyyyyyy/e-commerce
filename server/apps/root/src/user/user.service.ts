import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { Payload, USER_SERVICE } from '@libs/shared';
import { Address, User } from '@libs/domain';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UpdateAddressDTO } from './dtos/update-address.dto';
import { AddAddressDTO } from './dtos/add-address.dto';

@Injectable()
export class UserService {
  constructor(@Inject(USER_SERVICE) private rmqClient: ClientProxy) {}

  async getUserById(param: string, authentication: string): Promise<User> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('get_user_by_id', {
            param,
            authorization: authentication,
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

  async getUser(authentication: string): Promise<User> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send<User>('get_user', {
            authorization: authentication,
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

  async updateUser(
    request: UpdateUserDTO,
    imageFile: Payload,
    authentication: string,
  ): Promise<User> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('update_user', {
            request,
            imageFile,
            authorization: authentication,
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

  async deleteUser(param: string, authentication: string): Promise<boolean> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('delete_user', {
            param,
            authorization: authentication,
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

  async addAddress(
    request: AddAddressDTO,
    authentication: string,
  ): Promise<Address> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('add_address', {
            request,
            authorization: authentication,
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
            authorization: authentication,
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
            authorization: authentication,
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
            authorization: authentication,
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
