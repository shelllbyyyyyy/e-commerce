import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDTO {
  @IsString()
  @IsEmail()
  @ApiProperty({ example: "johndoe@getMaxListeners.com" })
  readonly email: string;

  @IsString()
  @ApiProperty({ example: "fcdioshf97436598rtgy" })
  readonly password: string;
}
