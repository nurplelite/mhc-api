import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Delete,
  // UseInterceptors,
  // UploadedFile,
  Request,
  Req,
  Logger,
  UseGuards,
} from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { type Response } from 'express';
import { type Request as ExpressRequest } from 'express';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { SessionGuard } from '@mhc-api/auth';



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



@Controller('form')
@UseGuards(SessionGuard)
export class FormController {
  private readonly logger = new Logger(FormController.name);

  constructor(private readonly FormService: FormService) {}

  @Get(':collection/:id')
  getDoc(@Param('collection') c: string, @Param('id') id: string) {
    this.logger.debug('getDoc entered with:', c, id);
    return this.FormService.getDocument(c, id);
  }

  @Post('submit/:accountId')
  setDoc(
    @Param('accountId') aId: string,
    @Body() form: CreateFormDto,
    @Req() req: ExpressRequest
  ) {
    this.logger.debug('setDoc entered with:', aId, form);
    this.logger.debug('🍪 Incoming cookies:', req.cookies); // ✅ Cookie debug log
    return this.FormService.setDocument(aId, form);
  }
}
