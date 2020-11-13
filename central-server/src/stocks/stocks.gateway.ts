import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { Logger, Controller, Headers, Header } from '@nestjs/common';
import { Socket } from 'net';
import { IexCloudCallerService } from 'src/iex-cloud-caller/iex-cloud-caller.service';

type SetSymbolsRequestBody = { userId: string, symbols: string[] }


const interval = 3_000

// @Header('Access-Control-Allow-Origin', '*')
// @WebSocketGateway({ transport: ['websocket'], origin : "https://localhost", secure: true })
// @WebSocketGateway({ transport: ['websocket'], origin : "localhost:4200", secure: true })
@Controller()
@WebSocketGateway()
export class StocksSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @WebSocketServer()
  wss;

  userToWatchlistMap = {}

  stockWatcherRunning = false

  // connections: any[] = []

  private logger = new Logger('AppGateway');

  @Header('Access-Control-Allow-Origin', '*')
  handleConnection(client) {
    this.logger.log('New client connected');

    client.emit('connection', 'Successfully connected to server');

    Object.keys(client).forEach( k => console.log('k is: ', k))

    // console.log('client id (aka user identifier): ', client.id)
    // console.log('client id (aka user identifier): ', client.disconnected)
    // console.log('client id (aka user identifier): ', client.nsp)

    // console.log('client is a ', typeof client)
    // console.log(client)
    // client.emit('events', { name: 'Nest' });

    console.log('emitting stuff...')
    console.log('server is: ', Object.keys(this.server.sockets.connected).length)
    // console.log('emitting stuff...', this.server)

    if (Object.keys(this.server.sockets.connected).length === 1) {
      this.startStockWatcher()
    }
  }

  async startStockWatcher() {
    // if (!this.stockWatcherRunning) {
    //   this.stockWatcherRunning = true

      // setInterval(() => {


      //   console.log('making api call to iex cloud...')

      //   console.log('blasting out updates!')

      //   
      // }, interval)

      console.log('starting timer')

      // const stockData = await iexCloudCallerService.getStockData()
      // await this.blastStockData(stockData) // initial blast
      await this.blastMessages() // initial blast
      await this.tickTimer()
    // }
  }

  async blastMessages() {
    console.log('blasting messages!')
    const randomNum = Math.random() * 10_000
    Object.keys(this.server.sockets.connected).forEach(async key => await this.server.sockets.connected[key].emit('new_data_for_watched_symbols', randomNum))

    // this.connections.forEach(async client => await client.emit('new_data_for_watched_symbols', randomNum))
  }

  async blastStockData(stockData: []) {
    console.log('blasting messages!')
    const randomNum = Math.random() * 10_000
    Object.keys(this.server.sockets.connected).forEach(async socketId => {
    
      // const stocks to send data for = sockIdToStockListHashmap[socketId]

      // filter stock data 

      await this.server.sockets.connected[socketId].emit('new_data_for_watched_symbols', randomNum)
    
    })

    // this.connections.forEach(async client => await client.emit('new_data_for_watched_symbols', randomNum))
  }

  tickTimer(): Promise<void> {
    return new Promise( resolve => {
      setTimeout(async () => {

        
        if (Object.keys(this.server.sockets.connected).length > 0) {
          console.log('ticking again..', Object.keys(this.server.sockets.connected).length)

          await this.blastMessages()
          this.tickTimer()
        }
        
        resolve()
      }, interval)
    })
  }

  handleDisconnect(client) {
    this.logger.log('Client disconnected');
  }

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  // }


  @SubscribeMessage('set_symbols_to_watch')
  async setSymbolsToWatch(@MessageBody() body: SetSymbolsRequestBody): Promise<any> {

    console.log(`got message to set watched symbols of user ${body.userId} to ${body.symbols}`)

    this.userToWatchlistMap[body.userId] = body.symbols

    return { success: true };
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  // @SubscribeMessage('events')
  // onEvent(@MessageBody() data: unknown): Observable<WsResponse<number>> {
  //   const event = 'events';
  //   const response = [1, 2, 3];

  //   return from(response).pipe(
  //     map(data => ({ event, data })),
  //   );
  // }

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return data;
  }

}