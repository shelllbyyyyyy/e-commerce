import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'johndoe' })
  readonly display_name?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional({ example: 'https://drive.google/images/me.png' })
  readonly profile_picture?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '+1126345326' })
  readonly phone_number?: string;
}
