import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SiteSsrService } from './site-ssr.service';
import { CreateSiteSsrDto } from './dto/create-site-ssr.dto';
import { UpdateSiteSsrDto } from './dto/update-site-ssr.dto';

@Controller('/')
export class SiteSsrController {
  constructor(private readonly ssr: SiteSsrService) {}

  @Get('*')
  async handle(@Req() req: Request, @Res() res: Response) {
    const html = await this.ssr.render(req);
    res.send(html);
  }
}
