import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //this needs to be dynamic from firestore in the future.
  const sites: string[] = [
    'http://localhost:4200',
    'http://127.0.0.1:4200',
    'https://madhareconsulting.com',
    'https://www.madhareconsulting.com',
    'https://djps-llc.com',
    'https://www.djps-llc.com',
    'https://api.madhareconsulting.com',
  ]

  //updating for main push
  app.enableCors({
    origin: (origin, callback) => {
      // Allow same-origin or tools like Postman (origin === undefined)
      if (!origin || sites.includes(origin)) {
        callback(null, origin); // ✅ One valid origin
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  app.use(cookieParser())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      enableDebugMessages: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }))
        return new Error(JSON.stringify(formattedErrors))
      }
    }),
  )


  const port = process.env.PORT || 3000

  await app.listen(port)

  Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
