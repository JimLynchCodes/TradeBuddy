// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import IoAdapter from '@nestjs/websockets';

// // const corsOptions = {}

// async function bootstrap() {

//   // const app = await NestFactory.create(AppModule);

//   const app = await NestFactory.create(AppModule, { cors: true });

//   // const app = await NestFactory.create(AppModule, { cors: { corsOptions... } });

//   // app.use((_req, res, _next) => {
//   //   res.header('Access-Control-Allow-Origin', '*');
//   // });
//   // app.enableCors();

//   // app.enableCors({ corsOptions.. });

//   // app.use(cors());

//   // app.useWebSocketAdapter(new IoAdapter());

//   app.getHttpServer()

//   await app.listen(3000);
// }
// bootstrap();

import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import * as fs from 'fs';

const port = process.env.PORT || 3002;

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('ssl-keys/localhost+3-key.pem'),
    cert: fs.readFileSync('ssl-keys/localhost+3.pem'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors({
    origin: [
      'http://localhost:4200', // angular
      'http://localhost:3000', // react
      'http://localhost:8081', // react-native
    ],
  });
  await app.listen(port);
  Logger.log(`Server running on https://localhost:${port}`, 'Bootstrap');
}
bootstrap();
