import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FirestoreService } from '@mhc-api/firestore';
import { StorageService } from '@mhc-api/storage';
import { Form } from './entities/form.entity';


@Injectable()
export class FormService {
  constructor(
    private readonly firestore: FirestoreService,
    private readonly storage: StorageService,
  ) {}

  getDocument(collection: string, id: string) {
    return this.firestore.getDocument(collection, id);
  }

  setDocument(accountId: string, data: CreateFormDto | UpdateFormDto) {
    const form: Form = {
      accountId: accountId,
      firstName: data.firstName,
      lastName: data.lastName,
      name: data.firstName + ' ' + data.lastName,
      email: data.email!,
      phone: data.phone,
      created: new Date(),
      formType: 'form',
      description: data.description,
      tags: ['test'],
    }

    const collection = `accounts/${accountId}/forms`
    return this.firestore.setDocument(collection, form)
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
