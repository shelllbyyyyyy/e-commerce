export class CreateUserCommand {
  constructor(
    public username: string,
    public email: string,
    public password: string,
  ) {}
}
