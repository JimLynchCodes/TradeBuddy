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
import { NestApplication, NestFactory } from '@nestjs/core';
import { HttpServer, Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import * as fs from 'fs';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
const express = require('express')


const port = process.env.PORT || 3002;

async function bootstrap() {
  const fs = require('fs');
  const keyFile  = fs.readFileSync('ssl-keys/localhost+3-key.pem');
  const certFile = fs.readFileSync('ssl-keys/localhost+3.pem');

  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions: {
  //     key: keyFile,
  //     cert: certFile,
  //   }});

  const httpsOptions = {
    key: fs.readFileSync('ssl-keys/localhost+3-key.pem'),
    cert: fs.readFileSync('ssl-keys/localhost+3.pem'),
    origins: 'localhost:4200',
    // origin: 'localhost:4200',
    // cors: {
    //   origin: 'localhost:4200',
    //   origins: ['localhost:4200'],
    //   methods: ['GET', 'PUT', 'POST', 'DELETE'],
    //   allowedHeaders: ['Content-Type', 'Authorization'],
    //   exposedHeaders: ['Authorization'],
    //   credentials: true
    // }
  };


  // const httpsOptions = {
  //   key: key,
  //   cert: cert,
  //   ca: ca
  // };
  // const expressInstance = express();
  const app: NestApplication = await NestFactory.create(
    AppModule,
    { httpsOptions }
  );
  // await app.listen(port);

  // const expressApp = express()
  // const app = await NestFactory.create(AppModule, expressApp, 
  //   { httpsOptions }
  // {
  // cors: {
  //   origin: ['https://localhost:4200'],
  //   methods: ['GET', 'PUT', 'POST', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   exposedHeaders: ['Authorization'],
  //   credentials: true
  // }
  // )

  app.enableCors();

  // const app = await NestFactory.create(AppModule)

  // await app.listen(port);
  // Logger.log(`Server running on https://localhost:${port}`, 'Bootstrap');

  // const expressApp = new HttpServer();
  // let httpsOptions: HttpsOptions
  // // if (process.env.ENV !== 'dev') {
  //   // httpsOptions = {
  //   // };
  //   // }
  //   const app = await NestFactory.create(AppModule
  //   , {
  //     // cors: true,
  //     cors: {
  //       origin: 'https://localhost:3002',
  //       methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  //       allowedHeaders: ['Content-Type', 'Authorization'],
  //       exposedHeaders: ['Authorization'],
  //       credentials: true,
  //     },
  //     httpsOptions: {
  //       key: fs.readFileSync('ssl-keys/localhost+3-key.pem'),
  //       cert: fs.readFileSync('ssl-keys/localhost+3.pem'),
  //       rejectUnauthorized: false
  //   }
  // });
  
  await app.listen(port);


}
bootstrap();


