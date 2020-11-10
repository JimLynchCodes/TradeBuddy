import { Component, OnInit, Input } from '@angular/core';
import { NewsFeedItemBulletPoint } from './news-feed-item.model';

@Component({
  selector: 'app-news-feed-item',
  templateUrl: './news-feed-item.component.html',
  styleUrls: ['./news-feed-item.component.scss']
})
export class NewsFeedItemComponent implements OnInit {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() bulletPoints: NewsFeedItemBulletPoint[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log('got points: ', this.bulletPoints)
    console.log('first point: ', this.bulletPoints[0])
    console.log('second point: ', this.bulletPoints[1])
    console.log('3 point: ', this.bulletPoints[2])
  }

}
