import { Injectable } from '@nestjs/common';

import { AddressRepository } from '../repositories/address-repository';
import { Address } from '../entities/address.entity';

@Injectable()
export class AddressService {
  constructor(private readonly repository: AddressRepository) {}

  async save(userId: string, data: Address): Promise<Address> {
    return await this.repository.save(userId, data);
  }

  async findById(id: string): Promise<Address> {
    return await this.repository.findById(id);
  }
  async findByUserId(userId: string): Promise<Address[]> {
    return await this.repository.findByUserId(userId);
  }

  async update(data: Address): Promise<Address> {
    return await this.repository.update(data);
  }

  async delete(id: string): Promise<string> {
    return await this.repository.delete(id);
  }
}
