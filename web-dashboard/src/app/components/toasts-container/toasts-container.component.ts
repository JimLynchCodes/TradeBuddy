import { Component, OnInit } from '@angular/core';
import { ToastManagerService } from '../../services/toast-manager/toast-manager.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.scss']
})
export class ToastsContainerComponent implements OnInit {

  toasts;
  
  undoneDismissedSuggestedOrders: BehaviorSubject<any> = new BehaviorSubject<any>(undefined)

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

  undoClicked(toast) {

    console.log('undo clicked for toast! ', toast)

    this.undoneDismissedSuggestedOrders.next(toast);

  }

}
