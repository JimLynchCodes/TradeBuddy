import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenOrderItemComponent } from './open-order-item.component';

describe('OpenOrderItemComponent', () => {
  let component: OpenOrderItemComponent;
  let fixture: ComponentFixture<OpenOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
