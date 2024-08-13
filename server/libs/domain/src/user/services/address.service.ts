import { Injectable } from '@nestjs/common';

import { AddressRepository } from '../repositories/address-repository';
import { Address } from '../entities/address.entity';

@Injectable()
export class AddressService {
  constructor(private readonly repository: AddressRepository) {}

  async save(data: Address): Promise<Address> {
    return await this.repository.save(data);
  }

  async findById(id: string): Promise<Address> {
    return await this.repository.findById(id);
  }

  async update(data: Address): Promise<Address> {
    return await this.repository.update(data);
  }

  async delete(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
}
