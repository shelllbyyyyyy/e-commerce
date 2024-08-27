export class Address {
  constructor(
    private readonly id: string,
    private readonly first_name: string,
    private readonly last_name: string,
    private readonly phone_number: string,
    private readonly street: string,
    private readonly city: string,
    private readonly state: string,
    private readonly postal_code: string,
    private readonly country_code: string,
    private readonly userId: string,
    private readonly mapUrl?: string,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number;
    this.street = street;
    this.city = city;
    this.state = state;
    this.postal_code = postal_code;
    this.country_code = country_code;
    this.userId = userId;
    this.mapUrl = mapUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getFirstname(): string {
    return this.first_name;
  }

  getLastname(): string {
    return this.last_name;
  }

  getPhoneNumber(): string {
    return this.phone_number;
  }

  getStreet(): string {
    return this.street;
  }

  getCity(): string {
    return this.city;
  }

  getState(): string {
    return this.state;
  }

  getPostalCode(): string {
    return this.postal_code;
  }

  getCountryCode(): string {
    return this.country_code;
  }

  getUserId(): string {
    return this.userId;
  }

  getMapUrl(): string {
    return this.mapUrl;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  static addAddress({
    id,
    first_name,
    last_name,
    phone_number,
    street,
    city,
    state,
    postal_code,
    country_code,
    userId,
    mapUrl,
  }: {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country_code: string;
    userId: string;
    mapUrl?: string;
  }): Address {
    return new Address(
      id,
      first_name,
      last_name,
      phone_number,
      street,
      city,
      state,
      postal_code,
      country_code,
      userId,
      mapUrl,
    );
  }

  updateAddress({
    first_name,
    last_name,
    phone_number,
    street,
    city,
    state,
    postal_code,
    country_code,
    mapUrl,
  }: {
    first_name: string;
    last_name: string;
    phone_number: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country_code: string;
    mapUrl?: string;
  }): Address {
    return new Address(
      this.id,
      first_name,
      last_name,
      phone_number,
      street,
      city,
      state,
      postal_code,
      country_code,
      this.userId,
      mapUrl,
    );
  }
}
