import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { FirestoreModule } from '@mhc-api/firestore';

@Module({
  imports: [FirestoreModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
