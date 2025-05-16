import { Injectable } from '@nestjs/common';
import { CreateSiteSsrDto } from './dto/create-site-ssr.dto';
import { UpdateSiteSsrDto } from './dto/update-site-ssr.dto';

@Injectable()
export class SiteSsrService {
  create(createSiteSsrDto: CreateSiteSsrDto) {
    return 'This action adds a new siteSsr';
  }

  findAll() {
    return `This action returns all siteSsr`;
  }

  findOne(id: number) {
    return `This action returns a #${id} siteSsr`;
  }

  update(id: number, updateSiteSsrDto: UpdateSiteSsrDto) {
    return `This action updates a #${id} siteSsr`;
  }

  remove(id: number) {
    return `This action removes a #${id} siteSsr`;
  }
}
