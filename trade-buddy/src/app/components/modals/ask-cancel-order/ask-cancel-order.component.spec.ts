import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskCancelOrderComponent } from './ask-cancel-order.component';

describe('AskCancelOrderComponent', () => {
  let component: AskCancelOrderComponent;
  let fixture: ComponentFixture<AskCancelOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskCancelOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskCancelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
