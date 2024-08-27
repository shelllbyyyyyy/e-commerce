import { Cart } from '@libs/domain/cart/entities/cart.entity';
import { Address } from './address.entity';
import { Order } from '@libs/domain/order/entities/order.entity';

export class User {
  constructor(
    private readonly id: string,
    private readonly username: string,
    private readonly email: string,
    private readonly password: string,
    private readonly isVerified: boolean,
    private readonly display_name?: string | undefined,
    private readonly profile_picture?: string | undefined,
    private readonly phone_number?: string | undefined,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
    private readonly address?: Address[] | undefined,
    private readonly cart?: Cart,
    private readonly order?: Order[],
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.isVerified = isVerified;
    this.display_name = display_name;
    this.profile_picture = profile_picture;
    this.phone_number = phone_number;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.address = address;
    this.cart = cart;
    this.order = order;
  }

  getId(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  IsVerified(): boolean {
    return this.isVerified;
  }

  getDisplayName(): string | undefined {
    return this.display_name;
  }

  getProfilePicture(): string | undefined {
    return this.profile_picture;
  }

  getPhoneNumber(): string | undefined {
    return this.phone_number;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getAddress(): Address[] | undefined {
    return this.address;
  }

  getCart(): Cart {
    return this.cart;
  }

  getOrder(): Order[] {
    return this.order;
  }

  static createUser({
    id,
    username,
    email,
    password,
    isVerified,
  }: {
    id: string;
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
  }): User {
    return new User(id, username, email, password, isVerified);
  }

  updateUser({
    display_name,
    profile_picture,
    phone_number,
  }: {
    display_name: string;
    profile_picture: string;
    phone_number: string;
  }): User {
    return new User(
      this.id,
      this.username,
      this.email,
      this.password,
      this.isVerified,
      display_name,
      profile_picture,
      phone_number,
    );
  }
}
