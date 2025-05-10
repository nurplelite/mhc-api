import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { SessionData } from '../types/session-token-payload'


declare module 'express' {
  interface Request {
    session?: SessionData
  }
}

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const token = req.cookies?.session

    if (!token) {
      throw new UnauthorizedException('Missing session token')
    }

    try {
      const decoded = await this.auth.verifyToken(token)
      req['session'] = decoded // attach session data to request
      return true
    } catch (err) {
      throw new UnauthorizedException(err)
    }
  }
}
