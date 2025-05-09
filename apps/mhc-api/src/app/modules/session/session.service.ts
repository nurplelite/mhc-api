import  { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirestoreService } from '@mhc-api/firestore';
import { CreateSessionDto } from './dto/create-session.dto';
import { AuthService } from '@mhc-api/auth';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

import { Logger } from '@nestjs/common';




@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(private firestore: FirestoreService, private auth: AuthService){}

  async startSession(siteId: string): Promise<{ token: string; sessionId: string }> {
    this.logger.debug('Creating session for site:', siteId);

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

  async verifySession(token: string): Promise<CreateSessionDto> {
    const sessionSecret = process.env.SESSION_SECRET
    if (!sessionSecret) {
      throw new Error('Session secret not found in environment variables')
    }

    try {
      const decoded = jwt.verify(token, sessionSecret) as CreateSessionDto
      return decoded
    } catch (err) {
      this.logger.warn('Session verification failed:', err)
      throw new UnauthorizedException('Invalid session')
    }
  }

}
