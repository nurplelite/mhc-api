import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreModule } from '@mhc-api/firestore';
import { StorageModule } from '@mhc-api/storage';
import { ConfigModule } from '@nestjs/config';
import { FormModule } from './modules/form/form.module';
import { SessionModule } from './modules/session/session.module';

@Module({
  imports: [
    FirestoreModule,
    StorageModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    FormModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
