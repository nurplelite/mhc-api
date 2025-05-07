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
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

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



@Controller('contact')
export class ContactController {
  private readonly logger = new Logger();

  constructor(private readonly contactService: ContactService) {
  }


  @Get('form/:collection/:id')
  getDoc(@Param('collection') c: string, @Param('id') id: string) {
    this.logger.debug('getDoc entered with:', c, id)
    return this.contactService.getDocument(c, id);
  }

  @Post('form/submit/:collection')
  setDoc(@Param('collection') c: string, @Body() form: CreateContactDto) {
    this.logger.debug('setDoc entered with:', c , form)
    return this.contactService.setDocument(c , form);
  }
}
