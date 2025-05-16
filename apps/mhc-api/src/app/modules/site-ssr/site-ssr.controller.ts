import {
  Controller,
  Get,
  Req,
  Res,
  type Request,
  type Response,
} from '@nestjs/common';
import { SiteSsrService } from './site-ssr.service';


@Controller('/')
export class SiteSsrController {
  constructor(private readonly ssr: SiteSsrService) {}

  @Get('*')
  async handle(@Req() req: typeof Request, @Res() res: typeof Response) {
    const html = await this.ssr.render(req);
    res.send(html);
  }
}
