import { Injectable } from '@nestjs/common';

import { Address } from '../entities/address.entity';

@Injectable()
export abstract class AddressRepository {
  abstract save(userId: string, data: Address): Promise<Address>;
  abstract findById(id: string): Promise<Address>;
  abstract findByUserId(userId: string): Promise<Address[]>;
  abstract update(data: Address): Promise<Address>;
  abstract delete(id: string): Promise<string>;
}
