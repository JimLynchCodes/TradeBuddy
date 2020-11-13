
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
const express = require('express')

const port = process.env.PORT || 3000;

async function bootstrap() {

  console.log('path is: ', process.env.SSL_KEY_PATH)

  const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    origins: 'localhost:4200',
  };

  const app: NestApplication = await NestFactory.create(
    AppModule,
    { httpsOptions }
  );

  app.enableCors();

  await app.listen(port);
}

bootstrap();


