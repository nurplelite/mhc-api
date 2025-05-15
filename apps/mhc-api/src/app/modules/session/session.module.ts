import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { FirestoreModule } from '@mhc-api/firestore';
import { SharedModule } from '../../shared.module';

@Module({
  imports: [FirestoreModule, SharedModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
