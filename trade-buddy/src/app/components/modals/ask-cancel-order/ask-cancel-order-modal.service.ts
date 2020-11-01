import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AskCancelOrderComponent } from './ask-cancel-order.component';
import { CancelOrderOptions } from './cancel-order.model';

@Injectable({
    providedIn: 'root'
})
export class AskCancelOrderModalService {
    bsModalRef: BsModalRef;
    orderToCancel: any;

    constructor(
        private bsModalService: BsModalService,
    ) { }

    confirm(order): Observable<any> {

        this.orderToCancel = order

        const initialState = {
            title: "Cancel Order?",
            order,
            options: [CancelOrderOptions.dont_cancel_order, CancelOrderOptions.cancel_order],
        };
        this.bsModalRef = this.bsModalService.show(AskCancelOrderComponent, { initialState });

        return new Observable<string>(this.getConfirmSubscriber());
    }

    private getConfirmSubscriber() {
        return (observer) => {
            const subscription = this.bsModalService.onHidden.subscribe((reason: any) => {
                observer.next({
                    answer: this.bsModalRef.content.answer,
                });
                observer.complete();
            });

            return {
                unsubscribe() {
                    subscription.unsubscribe();
                }
            };
        }
    }

}
