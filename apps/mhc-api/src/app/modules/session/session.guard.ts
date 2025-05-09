import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { SessionService, SessionTokenPayload } from './session.service'

declare module 'express' {
  interface Request {
    session?: SessionTokenPayload
  }
}

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const token = req.cookies?.session

    if (!token) {
      throw new UnauthorizedException('Missing session token')
    }

    try {
      const decoded = await this.sessionService.verifySession(token)
      req['session'] = decoded // attach session data to request
      return true
    } catch (err) {
      throw new UnauthorizedException('Invalid session')
    }
  }
}
