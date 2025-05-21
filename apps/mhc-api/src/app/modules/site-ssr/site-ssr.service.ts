import { Injectable } from '@nestjs/common';
import { CreateSiteSsrDto } from './dto/create-site-ssr.dto';
import { UpdateSiteSsrDto } from './dto/update-site-ssr.dto';

@Injectable()
export class SiteSsrService {
  private siteId: string


  // Get siteId from the constructor to initialize site

  constructor(siteId: string) {
    this.siteId = siteId
  }

  siteConfig(this.siteId){

  }
  render(createSiteSsrDto: CreateSiteSsrDto) {
    return 'This returns the static html';
  }

}
