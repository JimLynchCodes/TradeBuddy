import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFeedPageComponent } from './news-feed-page.component';

describe('NewsFeedPageComponent', () => {
  let component: NewsFeedPageComponent;
  let fixture: ComponentFixture<NewsFeedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsFeedPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
