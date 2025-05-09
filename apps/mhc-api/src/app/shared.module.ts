import { SessionModule } from './modules/session/session.module';
import { Module } from '@nestjs/common';
import { FirestoreModule } from '@mhc-api/firestore';
import { StorageModule } from '@mhc-api/storage';


@Module({
  imports: [FirestoreModule, StorageModule, SessionModule],
  exports: [FirestoreModule, StorageModule, SessionModule],
})
export class SharedModule {}
