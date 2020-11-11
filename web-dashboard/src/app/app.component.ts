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
    await this.tdApiSvc.init()

    this.tdApiSvc.positions.subscribe(data => {
      this.maskedConnectedAccountId = this.hideFullStringWithAsertisks(data[0]?.securitiesAccount.accountId)
    })

    const socket = io('https://localhost:3001',
      {
        reconnectionDelayMax: 10000
      })
    
    socket.on('connection', data => console.log)
  }

  private hideFullStringWithAsertisks(input: string): string {
    return input ? input.substr(0, 1) + '*****' + input.substr(input.length - 3, 3) :
      this.defaultNotConnectedToTdText
  }

  logoutClicked() {
    this.tdApiSvc.logout()
  }

}
