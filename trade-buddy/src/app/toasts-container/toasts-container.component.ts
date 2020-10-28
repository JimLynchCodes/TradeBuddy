import { Component, OnInit } from '@angular/core';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { ToastManagerService } from '../toast-manager.service';


@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.scss']
})
export class ToastsContainerComponent implements OnInit {

  toasts;
  
  constructor(public toastSvc: ToastManagerService) { }

  ngOnInit(): void {

    this.toastSvc.toastStream.subscribe( toasts => {

      console.log('toasts updated!')
      this.toasts = toasts
    }, error => {
      
      console.log('toasts errored!')
    }, () => {
      
      console.log('toasts completed!')
    })

  }

}
