import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFeedItemComponent } from './news-feed-item.component';

describe('NewsFeedItemComponent', () => {
  let component: NewsFeedItemComponent;
  let fixture: ComponentFixture<NewsFeedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsFeedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFeedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
