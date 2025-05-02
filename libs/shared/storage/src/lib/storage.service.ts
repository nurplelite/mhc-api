import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private bucket: any;

  constructor(private config: ConfigService) {
    const storage = new Storage()
    const bucketName = config.get<string>("FIREBASE_STORAGE_BUCKET")
    this.bucket = storage.bucket(bucketName || '');
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
