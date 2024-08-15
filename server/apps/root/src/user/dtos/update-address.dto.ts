import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDTO {
  @ApiProperty({
    example: 'John',
    description: 'First name of the person',
  })
  @IsString()
  @IsOptional()
  readonly first_name?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the person',
  })
  @IsString()
  @IsOptional()
  readonly last_name?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the person',
  })
  @IsString()
  @IsOptional()
  readonly phone_number?: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'Street address',
  })
  @IsString()
  @IsOptional()
  readonly street?: string;

  @ApiProperty({
    example: 'New York',
    description: 'City of the address',
  })
  @IsString()
  @IsOptional()
  readonly city?: string;

  @ApiProperty({
    example: 'NY',
    description: 'State of the address',
  })
  @IsString()
  @IsOptional()
  readonly state?: string;

  @ApiProperty({
    example: '10001',
    description: 'Postal code of the address',
  })
  @IsString()
  @IsOptional()
  readonly postal_code?: string;

  @ApiProperty({
    example: 'US',
    description: 'Country code of the address',
  })
  @IsString()
  @IsOptional()
  readonly country_code?: string;

  @ApiProperty({
    example: 'https://maps.google.com/?q=40.7128,-74.0060',
    description: 'Optional Google Maps URL for the address',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly mapUrl?: string;
}
