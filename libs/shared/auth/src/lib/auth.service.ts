// === auth.service.ts ===
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { SessionData } from '../types/session-token-payload'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  private getSecret(): string {
    const secret = process.env.SESSION_SECRET
    if (!secret) {
      this.logger.error('SESSION_SECRET not set')
      throw new Error('Missing session secret')
    }
    return secret
  }

  signToken(session: SessionData): string {
    const token = jwt.sign(session, this.getSecret(), {
      expiresIn: '1h'
    })
    this.logger.debug('Signed session token:', token)
    return token
  }

  verifyToken(token: string): SessionData {
    try {
      const payload = jwt.verify(token, this.getSecret()) as SessionData
      return payload
    } catch (err) {
      this.logger.warn('Failed to verify session token')
      throw new UnauthorizedException('Invalid session token')
    }
  }
}
