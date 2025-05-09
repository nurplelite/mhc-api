import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';

export interface SessionTokenPayload {
  sessionId: string;
  siteId: string;
  accountId: string;
  domain: string;
  iat?: number;
  exp?: number;
}


@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private site: SessionTokenPayload;

  // this service expects token payload to be passed in the constructor -  calling app needs to collect from firestore

  constructor(site: SessionTokenPayload){
    this.site = site
  }

  async getToken(siteId: string): Promise<{ token: string; sessionId: string }> {
    this.logger.debug('Creating session for site:', siteId);

    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret) {
      this.logger.error('Session secret not found in environment variables');
      throw new Error('Session secret not found in environment variables');
    }


    if (!this.site) {
      this.logger.warn(`Site not found for siteId: ${siteId}`);
      throw new UnauthorizedException('Site not found');
    }

    const sessionId = uuidv4();


    const payload = {
      sessionId,
      siteId,
      accountId: this.site.accountId,
      domain: this.site.domain
    };


    const token = jwt.sign(payload, sessionSecret, {
      expiresIn: '1h'
    });

    return { token, sessionId };
  }

  async verifySession(token: string): Promise<SessionTokenPayload> {
    const sessionSecret = process.env.SESSION_SECRET
    if (!sessionSecret) {
      throw new Error('Session secret not found in environment variables')
    }

    try {
      const decoded = jwt.verify(token, sessionSecret) as SessionTokenPayload
      return decoded
    } catch (err) {
      this.logger.warn('Session verification failed:', err)
      throw new UnauthorizedException('Invalid session')
    }
  }

}
