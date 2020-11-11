import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TdApiService } from './services/td-api.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  accountNumber: string;

  constructor(private http: HttpClient, private tdApiSvc: TdApiService) { }

  title = 'trade-buddy';

  defaultNotConnectedToTdText = '[No account connected]'
  maskedConnectedAccountId = this.defaultNotConnectedToTdText;

  access_token = 'ok'

  async ngOnInit() {

    console.log('App Component starting up!')
    

    console.log('@# starting up socket!')
    var socket = io('https://localhost:3002', {secure: true});
    socket.on('connect', function () {

        console.log('@# connected!')

        socket.emit('foo', 'bar')
        
    });
    socket.on('events', function (data) { 
        console.log('@# received message!', data)

    });
    socket.on('disconnect', function () { 
        console.log('@# disconnected from server!')
    });

    await this.tdApiSvc.init()

    this.tdApiSvc.positions.subscribe(data => {
      this.maskedConnectedAccountId = this.hideFullStringWithAsertisks(data[0]?.securitiesAccount.accountId)
    })

  }

  private hideFullStringWithAsertisks(input: string): string {
    return input ? input.substr(0, 1) + '*****' + input.substr(input.length - 3, 3) :
      this.defaultNotConnectedToTdText
  }

  logoutClicked() {
    this.tdApiSvc.logout()
  }

}
