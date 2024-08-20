export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly display_name?: string,
    public readonly phone_number?: string,
    public readonly profile_picture?: string,
    public readonly imageFile?: Express.Multer.File,
  ) {}
}
