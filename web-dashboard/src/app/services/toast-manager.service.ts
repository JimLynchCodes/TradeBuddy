import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  defaultToast = {
    id: Math.floor(Math.random() * 10000),
    type: 'success',
    msg: `New Toast ch.`,
    timeout: 5000, 
    undo: (toast) => {
      // this.toasts.push(toast)
    }
  }

  constructor() { }

  addToast(toast = this.defaultToast) {
    console.log('adding toast')
    this.toasts.push(toast)

    this.toastStream.next(this.toasts)
  }

  onClosed(closedToast: any): void {
    
    console.log('closedToast: ', closedToast)

    this.toasts = this.toasts.filter(toast => toast.id !== closedToast.id);
    
    console.log('toasts now: ', this.toasts)
    
  }
  
}
