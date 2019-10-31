import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StateModalPage } from '../app/pages/register/selectState';
import { BoardModalPage } from '../app/pages/register/selectBoard';


import { SellPostSuccessPageModule } from './pages/sell-post-success/sell-post-success.module';
import { CancelNonTradeHourPageModule } from './cancel-non-trade-hour/cancel-non-trade-hour.module';
import { CancelInProfilePageModule } from './cancel-in-profile/cancel-in-profile.module';
import { ModalEditPageModule } from './modal-edit/modal-edit.module';

@NgModule({
  declarations: [StateModalPage, BoardModalPage, AppComponent],
  entryComponents: [StateModalPage, BoardModalPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({ name: '__jppdb' }),
    AppRoutingModule,
    SellPostSuccessPageModule,
    CancelNonTradeHourPageModule,
    CancelInProfilePageModule,
    ModalEditPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
