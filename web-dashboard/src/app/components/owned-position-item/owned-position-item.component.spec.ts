import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedPositionItemComponent } from './owned-position-item.component';

describe('OwnedPositionItemComponent', () => {
  let component: OwnedPositionItemComponent;
  let fixture: ComponentFixture<OwnedPositionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnedPositionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnedPositionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
