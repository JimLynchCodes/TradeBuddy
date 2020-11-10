import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeBotPageComponent } from './trade-bot-page.component';

describe('TradeBotPageComponent', () => {
  let component: TradeBotPageComponent;
  let fixture: ComponentFixture<TradeBotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeBotPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeBotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
