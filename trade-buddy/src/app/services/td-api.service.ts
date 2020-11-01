import qs from 'qs'
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const tokenEndpoint = 'https://api.tdameritrade.com/v1/oauth2/token'

const getPositionEndpoint = 'https://api.tdameritrade.com/v1/accounts?fields=positions'

const getOrdersEndpoint = 'https://api.tdameritrade.com/v1/accounts?fields=orders'

const accountsBaseEndpoint = 'https://api.tdameritrade.com/v1/accounts'

interface TokenHolder {
  access_token: string,
  refresh_token: string
}

@Injectable({
  providedIn: 'root'
})
export class TdApiService {

  positions = new BehaviorSubject([])
  orders = new BehaviorSubject([])

  accessToken
  refreshToken

  accountId

  constructor(private http: HttpClient) {
    // this.refreshPositions()

    this.accessToken = localStorage.getItem('a_token')
    this.refreshToken = localStorage.getItem('r_token')
  }

  async setCallbackCode(code: string): Promise<void> {

    console.log('using code to get access and refresh tokens...', code)

    await this.callForAccessAndRefreshTokens(code)

  }

  private async callForAccessAndRefreshTokens(code: string): Promise<void> {

    const tokenHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    const body = {
      grant_type: 'authorization_code',
      access_type: 'offline',
      refresh_token: '',
      code: code,
      client_id: environment.td_client,
      redirect_uri: environment.redirect_uri
    }

    return new Promise(resolve => {
      this.http.post<TokenHolder>(tokenEndpoint, qs.stringify(body), { headers: tokenHeaders }).subscribe(async response => {
        console.log('got a response... ', response)
        this.setTokens(response.access_token, response.refresh_token);
        // await ;
        // await ;

        await Promise.all([this.refreshPositions(), this.refreshOrders()])
        resolve()
      })
    })
  }

  private setTokens(accessToken, refreshToken) {

    if (accessToken) {
      localStorage.setItem('a_token', accessToken)
      this.accessToken = accessToken
      console.log('saved a token!')
    }

    if (refreshToken) {
      localStorage.setItem('r_token', refreshToken)
      this.refreshToken = refreshToken
      console.log('saved r token!')
    }

  }

  refreshPositions(): Promise<void> {

    console.log('refreshing positions...')

    const positionsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })

    return new Promise(resolve => {
      this.http.get(getPositionEndpoint, { headers: positionsHeaders }).subscribe((positions: any) => {

        console.log('got positions: ', positions);

        this.positions.next(positions);
        resolve()
      })
    })

  }

  refreshOrders(): Promise<void> {

    const ordersHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })

    return new Promise(resolve => {
      this.http.get(getOrdersEndpoint, { headers: ordersHeaders }).subscribe((orders: any) => {

        console.log('got orderssss: ', orders)

        this.orders.next(orders);
        resolve()
      })
    })
  }

  async placeHardcodedOrder() {

    const placeOrderEndpoint = `https://api.tdameritrade.com/v1/accounts/${this.accountId}/orders`

    const requestBody = {
      "orderType": "MARKET",
      "session": "NORMAL",
      "duration": "DAY",
      "orderStrategyType": "SINGLE",
      "orderLegCollection": [
        {
          "instruction": "Buy",
          "quantity": 15,
          "instrument": {
            "symbol": "XYZ",
            "assetType": "EQUITY"
          }
        }
      ]
    }

    const ordersHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })

    try {
      const placeOrderResult = await this.http.post(placeOrderEndpoint, requestBody, { headers: ordersHeaders })
      console.log('order placed! ', placeOrderResult)
    }
    catch (err) {
      console.log('err placing order! ', err)

    }


  }

  async cancelOrder(order: any) {
    
    const cancelOrderHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })

    const cancelOrderEndpoint = `${accountsBaseEndpoint}/${order.accountId}/orders/${order.orderId}`

    console.log('calling to cancel order: ', order.orderId)

    return new Promise(resolve => {
      this.http.delete(cancelOrderEndpoint, { headers: cancelOrderHeaders }).subscribe((response: any) => {

        console.log('cancelled order! ', response)

        // this.orders.next(orders);

        this.refreshOrders();

        resolve()
      })
    })

  }

}
