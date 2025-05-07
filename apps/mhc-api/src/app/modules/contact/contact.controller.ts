import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { type Response } from 'express';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

@Controller('contact')
export class ContactController {
  private readonly logger = new Logger();

  constructor(private readonly contactService: ContactService) {
  }


  @Get('firestore/:collection/:id')
  getDoc(@Param('collection') c: string, @Param('id') id: string) {
    this.logger.debug('getDoc entered with:', c, id)
    return this.contactService.getDocument(c, id);
  }

  @Post('firestore/:collection')
  setDoc(@Param('collection') c: string, @Body() form: CreateContactDto) {
    this.logger.debug('setDoc entered with:', c , form)
    return this.contactService.setDocument(c , form);
  }

  @Post('storage/upload/:path')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('path') path: string,
    @UploadedFile() file: MulterFile,
  ) {
    this.logger.debug('upload entered with:', path, file)
    return this.contactService.uploadFile(path, file.buffer, file.mimetype);
  }

  @Delete('storage/:path')
  delete(@Param('path') path: string) {
    this.logger.debug('delete entered with:', path)
    return this.contactService.deleteFile(path);
  }

  @Get('storage/:path')
  async download(@Param('path') path: string, @Res() res: Response) {
    this.logger.debug('download entered with:', path, res)
    const buffer = await this.contactService.downloadFile(path);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(buffer);
  }
}
