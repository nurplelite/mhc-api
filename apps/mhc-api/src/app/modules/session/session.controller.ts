import { Controller, Logger, Param, Post, Res } from '@nestjs/common'
import { type Response } from 'express'
import { SessionService } from './session.service'
import { AuthService } from '@mhc-api/auth'


@Controller('session')
export class SessionController {
  private readonly logger = new Logger(SessionController.name)

  constructor(
    private readonly sessionService: SessionService,
    private readonly authService: AuthService
  ) {}

  @Post('start/:siteId')
  async startSession(
    @Param('siteId') siteId: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const session = await this.sessionService.createSession(siteId)
    const token = this.authService.signToken(session)

    res.cookie('session', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 60 * 60 * 1000 // 1 hour
    })

    this.logger.debug(`Session cookie set for siteId: ${siteId}`)
    return { status: 'ok', token }
  }
}
