import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Delete,
  // UseInterceptors,
  // UploadedFile,
  // Res,
  Logger,
} from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { type Response } from 'express';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';

// interface MulterFile {
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   size: number;
//   destination: string;
//   filename: string;
//   path: string;
//   buffer: Buffer;
// }



@Controller('Form')
export class FormController {
  private readonly logger = new Logger();

  constructor(private readonly FormService: FormService) {
  }


  @Get('form/:collection/:id')
  getDoc(@Param('collection') c: string, @Param('id') id: string) {
    this.logger.debug('getDoc entered with:', c, id)
    return this.FormService.getDocument(c, id);
  }

  @Post('form/submit/:accountId')
  setDoc(@Param('accountId') aId: string, @Body() form: CreateFormDto) {
    this.logger.debug('setDoc entered with:', aId , form)
    return this.FormService.setDocument(aId , form);
  }
}
