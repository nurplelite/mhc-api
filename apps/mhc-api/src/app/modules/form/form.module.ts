import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { SharedModule } from '../../shared.module';


@Module({
  imports: [SharedModule],
  exports: [],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
