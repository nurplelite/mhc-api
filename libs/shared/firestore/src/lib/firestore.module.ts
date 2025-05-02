import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service.js';

@Module({
  controllers: [],
  providers: [FirestoreService],
  exports: [FirestoreService],
})
export class FirestoreModule {}
