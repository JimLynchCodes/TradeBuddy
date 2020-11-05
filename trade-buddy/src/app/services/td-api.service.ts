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
  expires_in: number
  expiry_date: Date
  refresh_token: string
  refresh_token_expires_in: number
  refresh_token_expiry_date: Date
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
  accessTokenExpiryDate: Date;
  refreshTokenExpiryDate: Date;

  constructor(private http: HttpClient) {
    // this.refreshPositions()

    this.accessToken = localStorage.getItem('a_token')
    this.accessTokenExpiryDate = new Date(localStorage.getItem('a_ex_date'))
    this.refreshToken = localStorage.getItem('r_token')
    this.refreshTokenExpiryDate = new Date(localStorage.getItem('r_ex_date'))
  }

  async setCallbackCode(code: string): Promise<void> {

    console.log('using code to get access and refresh tokens...', code)

    const now = new Date();

    if (this.accessToken && now < this.accessTokenExpiryDate) {
      console.log('using the accessToken we have!')
    }
    else if (this.refreshToken && now < this.refreshTokenExpiryDate){
      console.log('using refreshToken to get new access token!')

      await this.callForNewAccessToken(this.refreshToken);

    }
    else {

      console.log('using call for new access and refresh')
      await this.callForAccessAndRefreshTokens(code)
    }

  }

  private async callForNewAccessToken(refreshToken: string): Promise<void> {
  const tokenHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    const body = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: environment.td_client,
      redirect_uri: environment.redirect_uri
    }

    return new Promise(resolve => {
      this.http.post<TokenHolder>(tokenEndpoint, qs.stringify(body), { headers: tokenHeaders }).subscribe(async response => {
        console.log('got a refresh response... ', response)
        this.setTokens(response.access_token, response.expires_in);

        await Promise.all([this.refreshPositions(), this.refreshOrders()])
        resolve()
      })
    })
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
        this.setTokens(response.access_token, response.expires_in, response.refresh_token, response.refresh_token_expires_in);

        await Promise.all([this.refreshPositions(), this.refreshOrders()])
        resolve()
      })
    })
  }

  private setTokens(accessToken, accessTokenExpirationTime, refreshToken = undefined, refreshTokenExpirationTime = undefined) {

    if (accessToken && accessTokenExpirationTime) {
      localStorage.setItem('a_token', accessToken)
      localStorage.setItem('a_ex_time', accessTokenExpirationTime)

      const accessTokenExpiryDate = new Date()
      accessTokenExpiryDate.setSeconds(accessTokenExpiryDate.getSeconds() + accessTokenExpirationTime)

      localStorage.setItem('a_ex_iso_date', accessTokenExpiryDate.toISOString())

      this.accessToken = accessToken
      this.accessTokenExpiryDate = accessTokenExpiryDate
      console.log('saved a token!')
    }

    if (refreshToken) {
      localStorage.setItem('r_token', refreshToken)
      localStorage.setItem('r_ex_time', refreshTokenExpirationTime)

      const refreshTokenExpiryDate = new Date()
      refreshTokenExpiryDate.setSeconds(refreshTokenExpiryDate.getSeconds() + refreshTokenExpirationTime)

      localStorage.setItem('r_ex_iso_date', refreshTokenExpiryDate.toISOString())

      this.refreshToken = refreshToken
      this.refreshTokenExpiryDate = refreshTokenExpiryDate
      console.log('saved a token!')
    }

  }

  refreshPositions(): Promise<void> {

    console.log('refreshing positions...')

    //TODO - check tokens before calling? if access expired, refresh it - if refresh expired, show error popup

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
