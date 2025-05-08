import { Injectable, Logger } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { ConfigService } from '@nestjs/config';
import { instanceToPlain } from 'class-transformer';


@Injectable()
export class FirestoreService {
  private readonly firestore: Firestore
  private readonly logger = new Logger(FirestoreService.name)

  constructor(config: ConfigService) {
    const projectId = config.get<string>('GOOGLE_CLOUD_PROJECT')
    const databaseId = config.get<string>('GOOGLE_CLOUD_DB')

    this.firestore = new Firestore({
      projectId,
      databaseId,
    });

    this.logger.debug(`Firestore initialized for project: ${projectId}, database: ${databaseId}`)
  }

  // async onModuleInit(): Promise<void> {
  //   try {
  //     const pingDoc = this.firestore.collection('__meta').doc('__ping')
  //     await pingDoc.set({ ts: new Date().toISOString() }, { merge: true })

  //     this.logger.log('✅ Firestore connection verified via __meta/__ping document.')
  //   } catch (err) {
  //     this.logger.error('❌ Firestore connection failed:', err)
  //     process.exit(1); // optional: hard-fail app startup
  //   }
  // }

  async getDocument(collection: string, docId: string): Promise<any> {
    const doc = await this.firestore.collection(collection).doc(docId).get()
    return doc.exists ? doc.data() : null
  }

  async setDocument(collection: string, data: any): Promise<void> {
    await this.firestore.collection(collection).doc().set(instanceToPlain(data), { merge: true })
  }
}
