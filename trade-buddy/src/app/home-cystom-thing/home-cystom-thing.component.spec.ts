import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCystomThingComponent } from './home-cystom-thing.component';

describe('HomeCystomThingComponent', () => {
  let component: HomeCystomThingComponent;
  let fixture: ComponentFixture<HomeCystomThingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCystomThingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCystomThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
