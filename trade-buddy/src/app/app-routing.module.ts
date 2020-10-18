import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsFeedPageComponent } from './components/news-feed-page/news-feed-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { TradeBotPageComponent } from './components/trade-bot-page/trade-bot-page.component';

export const routes: Routes = [
  { path: 'news-feed', component: NewsFeedPageComponent },
  { path: 'trade-bot', component: TradeBotPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: '**', redirectTo: '/trade-bot', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
