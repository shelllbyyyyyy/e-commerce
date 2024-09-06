export class NewUserCommand {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public username: string,
    public isVerified: boolean,
    public display_name: string,
    public profile_picture: string,
  ) {}
}
