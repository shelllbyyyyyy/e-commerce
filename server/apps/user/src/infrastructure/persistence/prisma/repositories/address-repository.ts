import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { Address, AddressRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { AddressMapper } from '../mapper/address.mapper';

@Injectable()
export class AddressRepositoryImpl implements AddressRepository {
  constructor(private readonly service: PrismaService) {}

  async save(userId: string, data: Address): Promise<Address> {
    const payload: Prisma.AddressCreateInput = AddressMapper.toPrisma(data);

    const {
      first_name,
      last_name,
      phone_number,
      street,
      city,
      state,
      postal_code,
      country_code,
      mapUrl,
    } = payload;

    const address = await this.service.address.create({
      data: {
        first_name,
        last_name,
        phone_number,
        street,
        city,
        state,
        postal_code,
        country_code,
        mapUrl,
        user: { connect: { id: userId } },
      },
      include: { user: true },
    });

    return AddressMapper.toDomain(address);
  }

  async findById(id: string): Promise<Address> {
    const address = await this.service.address.findUnique({ where: { id } });

    if (!address) return;

    return AddressMapper.toDomain(address);
  }

  async findByUserId(userId: string): Promise<Address[]> {
    const user = await this.service.user.findUnique({
      where: { id: userId },
      select: {
        address: true,
      },
    });

    if (!user) return;

    return user.address.map((value) => AddressMapper.toDomain(value));
  }

  async update(data: Address): Promise<Address> {
    const payload: Prisma.AddressUpdateInput = AddressMapper.toPrisma(data);

    const {
      first_name,
      last_name,
      phone_number,
      street,
      city,
      state,
      postal_code,
      country_code,
      mapUrl,
    } = payload;

    const address = await this.service.address.update({
      where: { id: data.getId() },
      data: {
        first_name,
        last_name,
        phone_number,
        street,
        city,
        state,
        postal_code,
        country_code,
        mapUrl,
      },
    });

    return AddressMapper.toDomain(address);
  }

  async delete(id: string): Promise<string> {
    await this.service.address.delete({
      where: { id },
    });

    return 'ok';
  }
}
