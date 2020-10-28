import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }

  placeOrder(order) {

    return new Promise( (resolve, reject) => {

      resolve()

    })

  }

}
