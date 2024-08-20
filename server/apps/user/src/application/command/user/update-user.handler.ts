import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User, UserService } from '@libs/domain';

import { UpdateUserCommand } from './update-user.command';
import { RpcException } from '@nestjs/microservices';
import { PROFILE_PICTURE, UploadService } from '@libs/shared';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements ICommandHandler<UpdateUserCommand, User>
{
  constructor(
    private readonly service: UserService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { id, display_name, phone_number, imageFile } = command;

    let profile_picture = command.profile_picture;

    try {
      const user = await this.service.findById(id);

      if (imageFile) {
        const file = user.getProfilePicture();

        if (file) {
          await this.uploadService.deleteImage(file);
        }

        const uploadImage = await this.uploadService.uploadImageToCloudinary(
          imageFile,
          PROFILE_PICTURE,
        );
        profile_picture = uploadImage.url;
      }

      const data = user.updateUser({
        display_name,
        phone_number,
        profile_picture,
      });

      const update = await this.service.updateById(data);

      if (!update) {
        throw new BadRequestException('something wrong');
      }

      return update;
    } catch (error) {
      new RpcException(error);
    }
  }
}
