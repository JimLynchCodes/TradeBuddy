import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCustomThingComponent } from './home-custom-thing.component';

describe('HomeCustomThingComponent', () => {
  let component: HomeCustomThingComponent;
  let fixture: ComponentFixture<HomeCustomThingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCustomThingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCustomThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
