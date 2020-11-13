import qs from 'qs'
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const tokenEndpoint = 'https://api.tdameritrade.com/v1/oauth2/token'

const getPositionEndpoint = 'https://api.tdameritrade.com/v1/accounts?fields=positions'

const getOrdersEndpoint = 'https://api.tdameritrade.com/v1/accounts?fields=orders'

const accountsBaseEndpoint = 'https://api.tdameritrade.com/v1/accounts'

enum TdTokenStatus {
  missing_tokens = 'missing_tokens',
  valid_access_token = 'valid_access_token',
  invalid_access_token_valid_refresh_token = 'invalid_access_token_valid_refresh_token',
  both_tokens_expired = 'both_tokens_expired',
}

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

  logoutWatcher = new BehaviorSubject(false)

  accessToken
  refreshToken

  accountId
  accessTokenExpiryDate: Date;
  refreshTokenExpiryDate: Date;

  currentlyCallingForNewAccessToken = false

  logout() {

    console.log('logging out!');

    this.positions.next([])
    this.orders.next([])

    delete this.accessToken
    delete this.refreshToken
    delete this.accountId
    delete this.accessTokenExpiryDate
    delete this.refreshTokenExpiryDate

    this.logoutWatcher.next(true)

    localStorage.clear()
  }

  constructor(private http: HttpClient) { }

  async refreshData() {
    // await Promise.all([this.refreshPositions(), this.refreshOrders()])
    await this.refreshPositions()
    await this.refreshOrders()
  }

  async init() {
    console.log('TD Service is starting up!')

    const tokenStatus = this.getCurrentTokenStatus()
    console.log('current token status: ', tokenStatus)
    await this.getNewTokensIfNecessary(tokenStatus)

  }

  /**
   *  Checks the localstorage for tokens. If they are expired, go to "logged out mode".
   */
  getCurrentTokenStatus(): TdTokenStatus {

    const now = new Date();

    this.accessToken = localStorage.getItem('a_token')
    this.accessTokenExpiryDate = new Date(parseInt(localStorage['a_ex_date'], 10));
    this.refreshToken = localStorage.getItem('r_token')
    this.refreshTokenExpiryDate = new Date(parseInt(localStorage['r_ex_date'], 10));

    console.log('a_expiry date:, ', this.accessTokenExpiryDate)
    console.log('r_expiry date:, ', this.refreshTokenExpiryDate)
    console.log('c_expiry date:, ', now)


    if (!this.accessToken && !this.refreshToken)
      return TdTokenStatus.missing_tokens

    if (this.accessToken && this.accessTokenExpiryDate && now < this.accessTokenExpiryDate)
      return TdTokenStatus.valid_access_token

    if (this.refreshToken && this.refreshTokenExpiryDate && now < this.refreshTokenExpiryDate)
      return TdTokenStatus.invalid_access_token_valid_refresh_token

    return TdTokenStatus.both_tokens_expired
  }

  async getNewTokensIfNecessary(tokenStatus: TdTokenStatus) {

    console.log('do we need to call for new tokens? ', tokenStatus)

    switch (tokenStatus) {

      case TdTokenStatus.missing_tokens:
        // (Nothing to do - logged out mode)
        break;

      case TdTokenStatus.valid_access_token:
        // (Nothing to do) - access token is valid!
        break;

      case TdTokenStatus.invalid_access_token_valid_refresh_token:
        await this.callWithRefreshTokenForNewAccessToken(this.refreshToken)
        break;

      case TdTokenStatus.both_tokens_expired:
        // Show "You have been logged out" somewhere?

        break;

      default:
        console.log('unrecognized token status: ', tokenStatus)

    }

  }

  async handleNewSuccessfulLogin(callbackCode: string = ''): Promise<void> {
    return this.callWithCodeForAccessAndRefreshTokens(callbackCode)

  }

  private async callWithRefreshTokenForNewAccessToken(refreshToken: string): Promise<void> {

    console.log('calling with refresh token for a new access token!', refreshToken)

    const tokenHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    // const body = {
    //   grant_type: 'refresh_token',
    //   refresh_token: refreshToken,
    //   client_id: environment.td_client,
    //   redirect_uri: environment.redirect_uri
    // }

    const body = {
      grant_type: 'refresh_token',
      access_type: '',
      refresh_token: refreshToken,
      code: '',
      client_id: environment.td_client + '@AMER.OAUTHAP',
      redirect_uri: environment.redirect_uri
    }

    const ok = qs.stringify(body)

    console.log(ok)

    if (!this.currentlyCallingForNewAccessToken) {
      this.currentlyCallingForNewAccessToken = true;
      console.log('calling for new access token...')

      return new Promise(resolve => {
        this.http.post<TokenHolder>(tokenEndpoint, ok, { headers: tokenHeaders }).subscribe(async response => {
          console.log('got a refresh response... ', response)
          this.setTokens(response.access_token, response.expires_in);

          this.refreshData();
          resolve();

          this.currentlyCallingForNewAccessToken = false
        }, () => {
          this.currentlyCallingForNewAccessToken = false
        })
      })
    } else {
      console.log('already calling for new access token...')
    }
  }

  private async callWithCodeForAccessAndRefreshTokens(code: string): Promise<void> {

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

    console.log('calling for token(s)...')

    return new Promise(resolve => {
      this.http.post<TokenHolder>(tokenEndpoint, qs.stringify(body), { headers: tokenHeaders }).subscribe(async response => {
        // console.log('got a response... ', response)
        this.setTokens(response.access_token, response.expires_in, response.refresh_token, response.refresh_token_expires_in);

        await this.refreshData()
        resolve()
      })
    })
  }

  private setTokens(accessToken, accessTokenExpirationTime, refreshToken = undefined, refreshTokenExpirationTime = undefined) {

    const now = new Date()
    console.log('setting tokens, now: ', now)

    if (accessToken && accessTokenExpirationTime) {
      localStorage.setItem('a_token', accessToken)
      localStorage.setItem('a_ex_time', accessTokenExpirationTime)

      console.log('accessTokenExpirationTime: ', accessTokenExpirationTime)
      console.log('now.getTime(): ', now.getTime())
      const accessTokenExpiryDate = new Date(now.getTime() + accessTokenExpirationTime * 1000)

      // const accessTokenExpiryTime = 

      // accessTokenExpiryDate.setSeconds(accessTokenExpiryDate.getSeconds() + accessTokenExpirationTime)

      // localStorage.setItem('a_ex_iso_date', accessTokenExpiryDate.toISOString())

      localStorage['a_ex_date'] = '' + accessTokenExpiryDate.getTime();
      console.log('setting a_ex_date: ', '' + accessTokenExpiryDate.getTime())

      this.accessToken = accessToken
      this.accessTokenExpiryDate = accessTokenExpiryDate
      console.log('saved a token!')
    }

    if (refreshToken) {
      localStorage.setItem('r_token', refreshToken)
      localStorage.setItem('r_ex_time', refreshTokenExpirationTime)

      console.log('got refresh time: ', refreshTokenExpirationTime)

      const refreshTokenExpiryDate = new Date(now.getTime() + refreshTokenExpirationTime * 1000)

      localStorage['r_ex_date'] = '' + refreshTokenExpiryDate.getTime();
      console.log('setting r_ex_date: ', '' + refreshTokenExpiryDate.getTime())

      this.refreshToken = refreshToken
      this.refreshTokenExpiryDate = refreshTokenExpiryDate
      console.log('saved r token!')
    }

  }

  async refreshPositions(): Promise<void> {

    console.log('refreshing positions...')

    const tokenStatus = await this.getCurrentTokenStatus();
    await this.getNewTokensIfNecessary(tokenStatus)

    if (tokenStatus !== TdTokenStatus.missing_tokens && tokenStatus !== TdTokenStatus.both_tokens_expired) {

      const positionsHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      })

      if (!this.currentlyCallingForNewAccessToken) {

        if (this.accessToken) {

          return new Promise(resolve => {
            this.http.get(getPositionEndpoint, { headers: positionsHeaders }).subscribe((positions: any) => {

              console.log('got positions: ', positions);

              this.positions.next(positions);
              resolve()
            })
          })
        } else {
          console.log('Error, trying to call with no access token!')
        }
      } else {
        console.log('Currently callingf or access token!')
      }
    }
  }

  async refreshOrders(): Promise<void> {

    console.log('refreshing orders...')

    const tokenStatus = await this.getCurrentTokenStatus();
    await this.getNewTokensIfNecessary(tokenStatus)

    if (tokenStatus !== TdTokenStatus.missing_tokens && tokenStatus !== TdTokenStatus.both_tokens_expired) {

      const ordersHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      })

      if (!this.currentlyCallingForNewAccessToken) {

        if (this.accessToken) {
          return new Promise(resolve => {
            this.http.get(getOrdersEndpoint, { headers: ordersHeaders }).subscribe((orders: any) => {

              console.log('got orderssss: ', orders)

              this.orders.next(orders);
              resolve()
            })
          })
        } else {
          console.log('Error, trying to call with no access token!')
        }
      } else {
        console.log('Currently callingf or access token!')
      }

    }
    else {
      console.log('can\'t refresh positions! ', tokenStatus)
    }
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

    if (!this.currentlyCallingForNewAccessToken) {

      if (this.accessToken) {

        try {
          const placeOrderResult = await this.http.post(placeOrderEndpoint, requestBody, { headers: ordersHeaders })
          console.log('order placed! ', placeOrderResult)
        }
        catch (err) {
          console.log('err placing order! ', err)

        }
      } else {
        console.log('Error, trying to call with no access token!')
      }
    } else {
      console.log('Currently callingf or access token!')
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
