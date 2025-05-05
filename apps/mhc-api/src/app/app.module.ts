import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreModule } from '@mhc-api/firestore';
import { StorageModule } from '@mhc-api/storage';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    FirestoreModule,
    StorageModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,

    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
