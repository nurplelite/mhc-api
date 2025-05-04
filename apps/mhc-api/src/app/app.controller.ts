import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response, Request } from 'express';
import { Logger } from '@nestjs/common';

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

@Controller()
export class AppController {
  private readonly logger = new Logger();

  constructor(private readonly appService: AppService) {
    this.logger.debug('constructor entereed')
  }


  @Get('firestore/:collection/:id')
  getDoc(@Param('collection') c: string, @Param('id') id: string) {
    this.logger.debug('getDoc entered with:', c, id)
    return this.appService.getDocument(c, id);
  }

  @Post('firestore/:collection')
  setDoc(@Param('collection') c: string, @Body() body: any) {
    this.logger.debug('setDoc entered with:', c , body)
    return this.appService.setDocument(c , body);
  }

  @Post('storage/upload/:path')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('path') path: string,
    @UploadedFile() file: MulterFile,
  ) {
    this.logger.debug('upload entered with:', path, file)
    return this.appService.uploadFile(path, file.buffer, file.mimetype);
  }

  @Delete('storage/:path')
  delete(@Param('path') path: string) {
    this.logger.debug('delete entered with:', path)
    return this.appService.deleteFile(path);
  }

  @Get('storage/:path')
  async download(@Param('path') path: string, @Res() res: Response) {
    this.logger.debug('download entered with:', path, res)
    const buffer = await this.appService.downloadFile(path);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(buffer);
  }
}
