import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedOrderItemComponent } from './suggested-order-item.component';

describe('SuggestedOrderItemComponent', () => {
  let component: SuggestedOrderItemComponent;
  let fixture: ComponentFixture<SuggestedOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
