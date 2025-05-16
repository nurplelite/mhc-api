import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSiteSsrDto {
  @IsString()
  @IsNotEmpty()
  url!: string;

  @IsString()
  @IsNotEmpty()
  method!: string;

  @IsString()
  @IsNotEmpty()
  body!: string;

  @IsString()
  @IsNotEmpty()
  headers!: string;
}
