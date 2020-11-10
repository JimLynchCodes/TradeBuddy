import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsFeedPageComponent } from './pages/news-feed-page/news-feed-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { TradeBotPageComponent } from './pages/trade-bot-page/trade-bot-page.component';
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: 'news-feed', component: NewsFeedPageComponent },
  { path: 'trade-bot', component: TradeBotPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'login-callback', component: LoginCallbackComponent },
  { path: '', redirectTo: '/trade-bot', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
