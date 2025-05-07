import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { FirestoreService } from '@mhc-api/firestore';
import { StorageService } from '@mhc-api/storage';

@Injectable()
export class ContactService {
  constructor(
    private readonly firestore: FirestoreService,
    private readonly storage: StorageService,
  ) {}

  getDocument(collection: string, id: string) {
    return this.firestore.getDocument(collection, id);
  }

  setDocument(collection: string, data: CreateContactDto | UpdateContactDto) {
    return this.firestore.setDocument(collection, data);
  }

  uploadFile(path: string, buffer: Buffer, contentType: string) {
    return this.storage.uploadFile(path, buffer, contentType);
  }

  deleteFile(path: string) {
    return this.storage.deleteFile(path);
  }

  downloadFile(path: string) {
    return this.storage.downloadFile(path);
  }
}
