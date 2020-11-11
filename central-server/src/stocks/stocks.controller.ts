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

// @Header('Access-Control-Allow-Origin', '*')
@Controller()
@WebSocketGateway(3001, { transport: ['websocket'], origins: ['https://localhost:4200'] })
export class StocksSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @WebSocketServer()
  wss;
  
  private logger = new Logger('AppGateway');
  
  @Header('Access-Control-Allow-Origin', '*')
  handleConnection(client) {
    this.logger.log('New client connected');
    client.emit('connection', 'Successfully connected to server');

    client.emit('events', { name: 'Nest' });
  }

  handleDisconnect(client) {
    this.logger.log('Client disconnected');
  }

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  // }

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