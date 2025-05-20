import { Injectable, Logger } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { GoogleAuth } from 'google-auth-library';


@Injectable()
export class StorageService {
  private readonly logger = new Logger();
  private readonly publicBucket: any;
  private readonly privateBucket: any;
  private bucket: any;

  constructor(config: ConfigService) {
    const storage = new Storage()

    this.publicBucket = storage.bucket(config.get('FIREBASE_STORAGE_PUBLIC_BUCKET') ||'');
    this.privateBucket = storage.bucket(config.get('FIREBASE_STORAGE_PRIVATE_BUCKET') ||'');
    this.bucket = this.publicBucket;

    this.logger.debug('initialized with: ', this.publicBucket.name, ' bucket:', this.bucket.name)
    this.logger.debug('initialized with: ', this.privateBucket.name)

    const auth = new GoogleAuth();
    auth.getClient().then(client => {
      this.logger.debug(`Using credentials for: ${client.projectId || 'unknown project'}`);
      if ('email' in client) {
        this.logger.debug(`Authenticated as service account: ${(client as any).email}`);
      } else {
        this.logger.debug(`Authenticated with user ADC or unknown credential source`);
      }
    })
  }

  async onModuleInit(): Promise<void> {
    try {
      const file = this.bucket.file('__ping.txt');
      await file.save('ping', { resumable: false });
      this.logger.debug('✅ Cloud Storage connection verified via __ping.txt');
    } catch (err) {
      this.logger.error('❌ Cloud Storage connection failed:', err);
      process.exit(1); // optional fail-fast for CI/staging
    }
  }

  async uploadFile(path: string, buffer: Buffer, contentType: string): Promise<string> {
    const file = this.bucket.file(path);
    await file.save(buffer, {
      contentType,
      resumable: false,
    });
    await file.makePublic();
    return file.publicUrl();
  }

  async deleteFile(path: string): Promise<void> {
    await this.bucket.file(path).delete();
  }

  async downloadFile(path: string): Promise<Buffer> {
    const file = this.bucket.file(path);
    const [contents] = await file.download();
    return contents;
  }
}
