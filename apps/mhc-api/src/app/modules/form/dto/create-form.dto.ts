import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string

  @IsString()
  @IsNotEmpty()
  lastName!: string

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsPhoneNumber('US')
  @IsNotEmpty()
  phone!: string

  @IsString()
  @IsNotEmpty()
  description!: string
}
