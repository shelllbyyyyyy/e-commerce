import { Address as AddressPrisma } from '@prisma/client';

import { Address } from '@libs/domain';

export class AddressMapper {
  static toPrisma(data: Address): any {
    const maps_url = data.getMapUrl() ? data.getMapUrl() : undefined;

    return {
      first_name: data.getFirstname(),
      last_name: data.getLastname(),
      phone_number: data.getPhoneNumber(),
      street: data.getStreet(),
      city: data.getCity(),
      state: data.getState(),
      postal_code: data.getPostalCode(),
      country_code: data.getCountryCode(),
      mapUrl: maps_url,
    };
  }

  static toDomain(data: AddressPrisma): Address {
    return new Address(
      data.id,
      data.first_name,
      data.last_name,
      data.phone_number,
      data.street,
      data.city,
      data.state,
      data.postal_code,
      data.country_code,
      data.userId,
      data.mapUrl,
      data.createdAt,
      data.updatedAt,
    );
  }
}
