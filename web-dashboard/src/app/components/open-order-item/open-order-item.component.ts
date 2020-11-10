import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-open-order-item',
  templateUrl: './open-order-item.component.html',
  styleUrls: ['./open-order-item.component.scss']
})
export class OpenOrderItemComponent implements OnInit {

  @Input() order: any = { orderLegCollection: [], status: '' };
  @Output() cancelClickedEvent = new EventEmitter<object>();

  constructor() { }

  ngOnInit(): void {
  }

  cancelOrderClick() {
    this.cancelClickedEvent.emit({})
  }

}
