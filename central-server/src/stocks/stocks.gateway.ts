import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,

} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger, Controller, Header } from '@nestjs/common';
import { IexCloudCallerService } from 'src/iex-cloud-caller/iex-cloud-caller.service';

const interval = 3_000

@Controller()
@WebSocketGateway()
export class StocksSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  @WebSocketServer()
  wss;

  stockWatcherRunning = false

  private logger = new Logger('AppGateway');

  constructor(private readonly iex: IexCloudCallerService,
    // private readonly algoEngine: AlgoEngineService
  ) {
    this.iex.stockData.subscribe(newStockData => {
      Object.keys(this.server?.sockets.connected ?? []).forEach(
        async key => await this.server?.sockets.connected[key]
          .emit('new_data_for_watched_symbols', newStockData))
    })
  }

  @Header('Access-Control-Allow-Origin', '*')
  handleConnection(client) {
    this.logger.log('New client connected! Connections now: ' + Object.keys(this.server?.sockets.connected ?? []).length);

    client.emit('connection', 'Successfully connected to server'); // tell new client that it connected successfully

    if (Object.keys(this.server?.sockets.connected ?? []).length === 1) {
      this.logger.log('First connected client, let\'s start up the stock watching engine!')

      this.startStockWatcher()
    }
  }

  private async startStockWatcher() {
    this.logger.log('Starting up stock watching engine...')
    const stockData = await this.getStockData()
    // await this.blastMessages();
    await this.tickTimer()
  }

  private async getStockData() {

    // const stocksToWatchCsvString = 'AAPL,GOOG';

    const newStockData = await this.iex.getStockData()

    console.log('got stock data! ', newStockData);

    return newStockData
  }

  // private async blastMessages() {

  //   console.log('blasting messages!')
  //   const randomNum = Math.random() * 10_000

  //   Object.keys(this.server?.sockets.connected).forEach(
  //     async key => await this.server?.sockets.connected[key]
  //       .emit('new_data_for_watched_symbols', stockData))

  // }

  // private async blastStockData(stockData: any) {
  //   console.log('blasting messages!')

  //   Object.keys(this.server?.sockets.connected).forEach(async socketId => {

  //     // const stocks to send data for = sockIdToStockListHashmap[socketId]

  //     // filter stock data 

  //     await this.server?.sockets.connected[socketId].emit('new_data_for_watched_symbols', stockData)

  //   })
  // }

  private tickTimer(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(async () => {


        if (Object.keys(this.server?.sockets.connected ?? []).length > 0) {
          console.log('ticking again..', Object.keys(this.server?.sockets.connected ?? []).length)

          // const stocksToWatchCsvString = 'AAPL,GOOG';
          await this.iex.getStockData()
          // await this.blastMessages()
          this.tickTimer()
        }

        resolve()
      }, interval)
    })
  }

  @SubscribeMessage('set_symbols_to_watch')
  async setSymbolsToWatch(@ConnectedSocket() client: any, @MessageBody() symbolsToWatchScvString: string): Promise<any> {

    console.log(`socket: ${client.id}`)

    // console.log(`got message to set watched symbols of user ${body.userId} to ${body.symbols}`)
    // console.log(`full body: ${body}`)

    // Object.keys(client).forEach( d => console.log(d))

    // this.socketToWatchlistMap[client.id] = symbolsToWatchScvString
    // console.log('map is now: ', this.socketToWatchlistMap)

    this.iex.addSymbolsToCentralWatchlist(client.id, symbolsToWatchScvString)

    return { success: true };
  }

  handleDisconnect(client) {
    this.logger.log('Client disconnected');
  }

}