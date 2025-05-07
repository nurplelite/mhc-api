import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { SharedModule } from '../../shared.module';


@Module({
  imports: [SharedModule],
  exports: [],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
