import { Module } from '@nestjs/common';
import { SiteSsrService } from './site-ssr.service';
import { SiteSsrController } from './site-ssr.controller';

@Module({
  controllers: [SiteSsrController],
  providers: [SiteSsrService],
})
export class SiteSsrModule {}
