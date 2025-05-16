import { Injectable } from '@nestjs/common';
import { CreateSiteSsrDto } from './dto/create-site-ssr.dto';
import { UpdateSiteSsrDto } from './dto/update-site-ssr.dto';

@Injectable()
export class SiteSsrService {

  render(createSiteSsrDto: CreateSiteSsrDto) {
    return 'This returns the static html';
  }

}
