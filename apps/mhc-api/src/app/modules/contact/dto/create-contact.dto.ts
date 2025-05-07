import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsPhoneNumber('US')
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
