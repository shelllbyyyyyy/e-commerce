export class AddAddressCommand {
  constructor(
    readonly id: string,
    readonly first_name: string,
    readonly last_name: string,
    readonly phone_number: string,
    readonly street: string,
    readonly city: string,
    readonly state: string,
    readonly postal_code: string,
    readonly country_code: string,
    readonly mapUrl?: string,
  ) {}
}
