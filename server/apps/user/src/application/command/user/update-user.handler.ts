import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { User, UserService } from '@libs/domain';
import { PROFILE_PICTURE, UploadService } from '@libs/shared';

import { UpdateUserCommand } from './update-user.command';

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

      return update;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new BadRequestException('Something wrong'));
      }
    }
  }
}
