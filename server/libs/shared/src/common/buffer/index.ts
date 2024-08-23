import { Injectable } from '@nestjs/common';

export type Payload = {
  originalname: string;
  fieldname: string;
  buffer: any;
  mimetype: string;
  size: number;
  encoding: string;
};

@Injectable()
export class ConvertBufferService {
  decodeFromMulter(file?: Express.Multer.File): Payload {
    if (!file) return;

    const { originalname, buffer, mimetype, size, encoding, fieldname } = file;

    const payload = {
      originalname: originalname,
      fieldname: fieldname,
      buffer: buffer.toString('base64'),
      mimetype: mimetype,
      size: size,
      encoding: encoding,
    };
    return payload;
  }

  encodeToMulter(data?: Payload): Express.Multer.File {
    if (!data) return;
    const { originalname, buffer, mimetype, size, encoding, fieldname } = data;

    const fileBuffer = Buffer.from(buffer, 'base64');

    const file: Express.Multer.File = {
      originalname: originalname,
      fieldname: fieldname,
      mimetype: mimetype,
      size: size,
      buffer: fileBuffer,
      encoding: encoding,
      destination: '',
      filename: '',
      path: '',
      stream: null,
    };

    return file;
  }
}
