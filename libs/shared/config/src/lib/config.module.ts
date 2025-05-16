import { Module, Global } from '@nestjs/common';
import { MhcApiConfigService } from './config.service';

@Global()
@Module({
  controllers: [],
  providers: [MhcApiConfigService],
  exports: [MhcApiConfigService],
})
export class MhcApiConfigModule {}
