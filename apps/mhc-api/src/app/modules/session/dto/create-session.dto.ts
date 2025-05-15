import { IsNotEmpty, IsRFC3339, IsString, isRFC3339 } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  accountId!: string;

  @IsString()
  @IsNotEmpty()
  domain!: string;

  @IsString()
  @IsNotEmpty()
  sessionId!: string;

  @IsString()
  @IsNotEmpty()
  siteId!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  token!: string;

  @IsRFC3339()
  @IsNotEmpty()
  createdAt!: string;

  @IsRFC3339()
  @IsNotEmpty()
  expiresAt!: string;
}


