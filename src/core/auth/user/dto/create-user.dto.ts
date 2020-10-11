import { IsAlphanumeric, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  username: string;

  @IsAlphanumeric()
  password: string;
}
