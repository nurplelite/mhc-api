import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class StorageService {
  private storage = new Storage();
  private bucket = this.storage.bucket(process.env.FIREBASE_STORAGE_BUCKET || '');

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
