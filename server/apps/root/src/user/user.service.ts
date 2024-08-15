import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { USER_SERVICE } from '@libs/shared';
import { Address } from '@libs/domain';

import { AddAddressDTO } from './dtos/add-address.dto';
import { UpdateAddressDTO } from './dtos/update-address.dto';

@Injectable()
export class UserService {
  constructor(@Inject(USER_SERVICE) private rmqClient: ClientProxy) {}

  async addAddress(
    request: AddAddressDTO,
    authentication: string,
  ): Promise<Address> {
    try {
      const result = await lastValueFrom(
        this.rmqClient.send('add_address', {
          request,
          access_token: authentication,
        }),
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async updateAddress(
    param: string,
    request: UpdateAddressDTO,
    authentication: string,
  ): Promise<Address> {
    try {
      const result = await lastValueFrom(
        this.rmqClient.send('update_address', {
          param,
          request,
          access_token: authentication,
        }),
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAddress(id: string, authentication: string): Promise<Address> {
    try {
      const result = await lastValueFrom(
        this.rmqClient.send('delete_address', {
          id,
          access_token: authentication,
        }),
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getAddressByUser(authentication: string): Promise<Address[]> {
    try {
      const result = await lastValueFrom(
        this.rmqClient.send('get_address_by_user', {
          access_token: authentication,
        }),
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getAddress(id: string, authentication: string): Promise<Address> {
    try {
      const result = await lastValueFrom(
        this.rmqClient.send('get_address', {
          id,
          access_token: authentication,
        }),
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
