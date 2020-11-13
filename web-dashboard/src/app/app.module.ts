import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NewsFeedPageComponent } from './pages/news-feed-page/news-feed-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { FooterNavComponent } from './components/footer-nav/footer-nav.component';
import { TradeBotPageComponent } from './pages/trade-bot-page/trade-bot-page.component';
import { RouterModule } from '@angular/router';
import { NewsFeedItemComponent } from './components/news-feed-item/news-feed-item.component';
import { ToastsContainerComponent } from './components/toasts-container/toasts-container.component';
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EnableGainslockConfirmComponent } from './components/modals/enable-gainslock-confirm/enable-gainslock-confirm.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { AskCancelOrderComponent } from './components/modals/ask-cancel-order/ask-cancel-order.component';
import { OpenOrderItemComponent } from './components/open-order-item/open-order-item.component';
import { MoneyWithCommasPipe } from './pipes/money-with-commas/money-with-commas.pipe';
import { AskPlaceTradeComponent } from './components/modals/ask-place-trade/ask-place-trade.component';
import { OwnedPositionItemComponent } from './components/owned-position-item/owned-position-item.component';
import { SuggestedOrderItemComponent } from './components/suggested-order-item/suggested-order-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsFeedPageComponent,
    SettingsPageComponent,
    FooterNavComponent,
    TradeBotPageComponent,
    NewsFeedItemComponent,
    ToastsContainerComponent,
    LoginCallbackComponent,
    NotFoundComponent,
    EnableGainslockConfirmComponent,
    AskCancelOrderComponent,
    OpenOrderItemComponent,
    MoneyWithCommasPipe,
    AskPlaceTradeComponent,
    OwnedPositionItemComponent,
    SuggestedOrderItemComponent
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
    AlertModule.forRoot(),
    NgxSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
