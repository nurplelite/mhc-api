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
import type { Express } from 'express';

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
  constructor(private readonly appService: AppService) {}

  @Get('firestore/:collection/:id')
  getDoc(@Param('collection') c: string, @Param('id') id: string) {
    return this.appService.getDocument(c, id);
  }

  @Post('firestore/:collection/:id')
  setDoc(@Param('collection') c: string, @Param('id') id: string, @Body() body: any) {
    return this.appService.setDocument(c, id, body);
  }

  @Post('storage/upload/:path')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('path') path: string,
    @UploadedFile() file: MulterFile,
  ) {
    return this.appService.uploadFile(path, file.buffer, file.mimetype);
  }

  @Delete('storage/:path')
  delete(@Param('path') path: string) {
    return this.appService.deleteFile(path);
  }

  @Get('storage/:path')
  async download(@Param('path') path: string, @Res() res: Response) {
    const buffer = await this.appService.downloadFile(path);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(buffer);
  }
}
