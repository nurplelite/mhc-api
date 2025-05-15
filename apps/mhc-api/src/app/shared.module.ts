import { Module } from '@nestjs/common';
import { AuthModule } from '@mhc-api/auth';
import { FirestoreModule } from '@mhc-api/firestore';
import { StorageModule } from '@mhc-api/storage';
import { GmailModule } from '@mhc-api/gmail';


@Module({
  imports: [FirestoreModule, StorageModule, AuthModule, GmailModule],
  exports: [FirestoreModule, StorageModule, AuthModule, GmailModule],
})
export class SharedModule {}
