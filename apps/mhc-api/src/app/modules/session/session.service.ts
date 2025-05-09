import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirestoreService } from '@mhc-api/firestore';
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
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(private firestore: FirestoreService){}

  async startSession(siteId: string): Promise<{ token: string; sessionId: string }> {
    this.logger.debug('Creating session for site:', siteId);

    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret) {
      this.logger.error('Session secret not found in environment variables');
      throw new Error('Session secret not found in environment variables');
    }

    const site = await this.firestore.getDocument('sites', siteId);

    if (!site) {
      this.logger.warn(`Site not found for siteId: ${siteId}`);
      throw new UnauthorizedException('Site not found');
    }

    const sessionId = uuidv4();


    const payload = {
      sessionId,
      siteId,
      accountId: site.accountId,
      domain: site.domain
    };


    const token = jwt.sign(payload, sessionSecret, {
      expiresIn: '1h'
    });
    this.logger.debug('Session created with payload:', payload);
    this.logger.debug('Session created with token:', token);

    const collection = `accounts/${site.accountId}/sessions`
    await this.firestore.setDocument(collection, payload)

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
