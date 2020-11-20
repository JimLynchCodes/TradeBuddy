import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketServerService {
  
  startSocket() {
    console.log('starting socket...')
  }

  constructor() { }
}
