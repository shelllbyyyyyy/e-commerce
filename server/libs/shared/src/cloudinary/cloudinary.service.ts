import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'nestjs-cloudinary';

@Injectable()
export class UploadService {
  constructor(private service: CloudinaryService) {}
  async uploadImageToCloudinary(file: Express.Multer.File, bucket: string) {
    return await this.service.uploadFile(file, {
      folder: bucket,
    });
  }

  async deleteImage(imageUrl: string) {
    const imageId = this.extractPublicId(imageUrl);

    return await this.service.cloudinary.uploader.destroy(imageId);
  }

  private extractPublicId(imageUrl: string): string | null {
    try {
      const regex = /\/v\d+\/(.+)\.[a-z]{3,4}$/;
      const match = imageUrl.match(regex);
      return match ? match[1] : null;
    } catch (error) {
      throw new Error(`'Error extracting public_id from URL: ${error}`);
    }
  }
}
