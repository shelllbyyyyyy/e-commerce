import { Injectable } from '@nestjs/common';

import { AddressRepository } from '../repositories/address-repository';
import { UserRepository } from '../repositories/user-repository';
import { Address } from '../entities/address.entity';
import { randomUUID } from 'crypto';

type AddAddress = {
  first_name: string;
  last_name: string;
  phone_number: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country_code: string;
  userId: string;
  mapUrl: string;
};

type UpdateAddress = {
  id?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  street?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country_code?: string;
  mapUrl?: string;
};

@Injectable()
export class AddressService {
  constructor(
    private readonly repository: AddressRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async save({
    city,
    country_code,
    first_name,
    last_name,
    mapUrl,
    phone_number,
    postal_code,
    state,
    street,
    userId,
  }: AddAddress): Promise<Address> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');

    const newAddress = Address.addAddress({
      id: randomUUID(),
      first_name,
      last_name,
      phone_number,
      street,
      city,
      state,
      postal_code,
      country_code,
      userId: user.getId(),
      mapUrl,
    });

    return await this.repository.save(userId, newAddress);
  }

  async findById(id: string): Promise<Address> {
    return await this.repository.findById(id);
  }
  async findByUserId(userId: string): Promise<Address[]> {
    return await this.repository.findByUserId(userId);
  }

  async update({
    city,
    country_code,
    first_name,
    last_name,
    mapUrl,
    phone_number,
    postal_code,
    state,
    street,
    id,
  }: UpdateAddress): Promise<Address> {
    const address = await this.repository.findById(id);
    if (!address) throw new Error('Address not found');

    const newAddress = address.updateAddress({
      first_name,
      last_name,
      phone_number,
      street,
      city,
      state,
      postal_code,
      country_code,
      mapUrl,
    });
    return await this.repository.update(newAddress);
  }

  async delete(id: string): Promise<string> {
    return await this.repository.delete(id);
  }
}
