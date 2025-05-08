import {
  Controller,
  Post,
  Param,
  Logger
} from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  private readonly logger = new Logger(SessionController.name);
  constructor(private readonly sessionService: SessionService) {}

  @Post('start/:siteId')
  create(@Param('siteId') siteId: string) {
    this.logger.debug('Creating session for site:', siteId);
    return this.sessionService.createSession(siteId);
  }

  @Post('verify/:token')
  verify(@Param('token') token: string) {
    this.logger.debug('Verifying session with token:', token);
    return this.sessionService.verifySession(token);
  }

}
