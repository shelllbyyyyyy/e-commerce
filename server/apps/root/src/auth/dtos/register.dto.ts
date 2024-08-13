import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @ApiProperty({ example: 'johndoe' })
  readonly username: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'johndoe@getMaxListeners.com' })
  readonly email: string;

  @IsString()
  @ApiProperty({ example: 'fdhuwoehr9324756fhg' })
  readonly password: string;
}
