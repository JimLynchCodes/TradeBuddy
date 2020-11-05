import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskPlaceTradeComponent } from './ask-place-trade.component';

describe('AskPlaceTradeComponent', () => {
  let component: AskPlaceTradeComponent;
  let fixture: ComponentFixture<AskPlaceTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskPlaceTradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskPlaceTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
