import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared.module';
import { FormModule } from './modules/form/form.module';
import { SessionModule } from './modules/session/session.module';
import { SiteSsrModule } from './modules/site-ssr/site-ssr.module';

@Module({
  imports: [
    FormModule,
    SessionModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    SiteSsrModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
