import { Injectable } from '@nestjs/common';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { initializeApp, applicationDefault } from 'firebase-admin/app';

@Injectable()
export class FirestoreService {
  private firestore: Firestore;

  constructor() {
    initializeApp({
      credential: applicationDefault(),
    });

    this.firestore = getFirestore(); // ✅ correct static method
  }

  async getDocument(collection: string, docId: string): Promise<any> {
    const doc = await this.firestore.collection(collection).doc(docId).get();
    return doc.exists ? doc.data() : null;
  }

  async setDocument(collection: string, docId: string, data: any): Promise<void> {
    await this.firestore.collection(collection).doc(docId).set(data, { merge: true });
  }
}
