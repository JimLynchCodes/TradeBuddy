import { Component, OnInit } from '@angular/core';
import { NewsFeedItem } from '../../components/news-feed-item/news-feed-item.model';

@Component({
  selector: 'app-news-feed-page',
  templateUrl: './news-feed-page.component.html',
  styleUrls: ['./news-feed-page.component.scss']
})
export class NewsFeedPageComponent implements OnInit {

  hardcodedFakeNewsItems: NewsFeedItem[] = [
    {
      title: "Example Title!",
      description: 'Example description!',
      bulletPoints: [{
        text: 'Reason 1',
      }, {
        text: 'Another reason',
      }, {
        text: 'Some other reason that has a realistic amount of text.',
      }]
    },
    {
      title: "Example Title!",
      description: 'Example description!',
      bulletPoints: [{
        text: 'Reason 1',
      }, {
        text: 'Another reason',
      }, {
        text: 'Some other reason that has a realistic amount of text.',
      }]
    }
  ]

  constructor() { }

  ngOnInit(): void { }

}
