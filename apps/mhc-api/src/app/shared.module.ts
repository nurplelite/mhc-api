import { Module } from '@nestjs/common';
import { FirestoreModule } from '@mhc-api/firestore';
import { StorageModule } from '@mhc-api/storage';

@Module({
  imports: [FirestoreModule, StorageModule],
  exports: [FirestoreModule, StorageModule],
})
export class SharedModule {}
