import { HttpModule, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksSocketGateway } from './stocks/stocks.gateway';
import { IexCloudCallerService } from './iex-cloud-caller/iex-cloud-caller.service';
import { ConfigModule } from '@nestjs/config';
// import { AlgoEngineService } from './algo-engine/algo-engine.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.dev'],
    })],
  controllers: [AppController, 
    StocksSocketGateway],
  providers: [AppService,
    IexCloudCallerService,
    StocksSocketGateway,
    // AlgoEngineService,
    Logger
  ],

})
export class AppModule { }
