import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNewUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
