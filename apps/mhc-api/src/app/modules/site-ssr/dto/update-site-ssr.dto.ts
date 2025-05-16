import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteSsrDto } from './create-site-ssr.dto';

export class UpdateSiteSsrDto extends PartialType(CreateSiteSsrDto) {}
