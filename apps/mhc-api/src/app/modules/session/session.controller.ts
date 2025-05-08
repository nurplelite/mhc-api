import {
  Controller,
  Post,
  Param,
} from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('start/:siteId')
  create(@Param('siteId') siteId: string) {
    return this.sessionService.createSession(siteId);
  }

  @Post('verify/:token')
  verify(@Param('token') token: string) {
    return this.sessionService.verifySession(token);
  }

}
