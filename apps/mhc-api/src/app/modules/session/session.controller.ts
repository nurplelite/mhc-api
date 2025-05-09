import {
  Controller,
  Post,
  Param,
  Logger,
  Res,
} from '@nestjs/common';
import { type Response } from 'express';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  private readonly logger = new Logger(SessionController.name);
  constructor(private readonly sessionService: SessionService) {}

  @Post('session/start/:siteId')
  async startSession(
    @Param('siteId') siteId: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const { token } = await this.sessionService.startSession(siteId)

    res.cookie('session', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000 // 1 hour
    })

    return { status: 'ok' }
  }

}
