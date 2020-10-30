import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableGainslockConfirmComponent } from './enable-gainslock-confirm.component';

describe('EnableGainslockConfirmComponent', () => {
  let component: EnableGainslockConfirmComponent;
  let fixture: ComponentFixture<EnableGainslockConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableGainslockConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableGainslockConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
