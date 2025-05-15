// === session.service.ts ===
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { FirestoreService } from '@mhc-api/firestore'
import { v4 as uuidv4 } from 'uuid'
import { SessionData } from '@mhc-api/auth'



@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name)

  constructor(private firestore: FirestoreService) {}

  async createSession(siteId: string): Promise<SessionData> {
    this.logger.debug('Creating session for site:', siteId)

    const site = await this.firestore.getDocument('sites', siteId)
    if (!site) {
      this.logger.warn(`Site not found for siteId: ${siteId}`)
      throw new UnauthorizedException('Site not found')
    }

    const sessionId = uuidv4()

    const sessionData: SessionData = {
      sessionId,
      siteId,
      accountId: site.accountId,
      domain: site.domain
    }

    const collection = `accounts/${site.accountId}/sessions`
    await this.firestore.setDocument(collection, sessionData)

    return sessionData
  }
}
