import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeCystomThingComponent } from './home-cystom-thing/home-cystom-thing.component';
import { HomeCustomThingComponent } from './home-custom-thing/home-custom-thing.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NewsFeedPageComponent } from './components/news-feed-page/news-feed-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { FooterNavComponent } from './components/footer-nav/footer-nav.component';
import { TradeBotPageComponent } from './components/trade-bot-page/trade-bot-page.component';
import { RouterModule } from '@angular/router';
import { NewsFeedItemComponent } from './components/news-feed-item/news-feed-item.component';
import { ToastsContainerComponent } from './toasts-container/toasts-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCystomThingComponent,
    HomeCustomThingComponent,
    NewsFeedPageComponent,
    SettingsPageComponent,
    FooterNavComponent,
    TradeBotPageComponent,
    NewsFeedItemComponent,
    ToastsContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
