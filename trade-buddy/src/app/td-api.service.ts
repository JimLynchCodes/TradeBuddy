import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const getPositionEndpoint = 'https://api.tdameritrade.com/v1/accounts?fields=positions'

const getOrdersEndpoint = 'https://api.tdameritrade.com/v1/accounts?fields=orders'

const placeOrderEndpoint = 'https://api.tdameritrade.com/v1/accounts?fields=orders'



@Injectable({
  providedIn: 'root'
})
export class TdApiService {

  positions
  orders

  accessToken
  accountId

  constructor(private http: HttpClient) {
    // this.refreshPositions()
  }

  refreshPositions() {

    const positionsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })

    this.positions = this.http.get(getPositionEndpoint, { headers: positionsHeaders })

  }

  refreshOrders() {

    const ordersHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })

    this.orders = this.http.get(getOrdersEndpoint, { headers: ordersHeaders })

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
    catch(err) {
      console.log('err placing order! ', err)

    }


  }

}
