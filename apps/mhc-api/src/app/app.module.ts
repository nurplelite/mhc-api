import { Firestore } from 'firebase-admin/firestore';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreModule } from '@shared/firestore';
import { StorageModule } from '@shared/storage';

@Module({
  imports: [FirestoreModule, StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
