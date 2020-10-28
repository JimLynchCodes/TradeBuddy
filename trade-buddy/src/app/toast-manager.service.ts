import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';

@Injectable({
  providedIn: 'root'
})
export class ToastManagerService {

  toasts: any = [{
    id: 1,
    type: 'success',
    msg: `Noice shares of MSFT @ $15.04 each.`,
    timeout: 5000
  }]

  toastStream = new BehaviorSubject(this.toasts)

  constructor() { }


  addHardcodedToastToast() {
    this.toasts.push({
      id: Math.floor(Math.random() * 10000),
      type: 'success',
      msg: `New Toast ch.`,
      timeout: 10_000
    })
  }

  addToast() {
    console.log('adding toast')
    this.toasts.push({
      id: Math.floor(Math.random() * 10000),
      type: 'success',
      msg: `New Toast ch.`,
      timeout: 5000
    })

    this.toastStream.next(this.toasts)

    console.log('toasts now: ', this.toasts)
    console.log('toastsStream now: ', this.toastStream)
  }

  onClosed(closedToast: any): void {
    
    console.log('closedToast: ', closedToast)

    this.toasts = this.toasts.filter(toast => toast.id !== closedToast.id);
    
    console.log('toasts now: ', this.toasts)
    
  }
  
}
