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
import { StateModalPage } from './pages/modals/selectState';
import { BoardModalPage } from './pages/modals/selectBoard';
import { LocalityModalPage } from './pages/modals/selectLocality';

import { SellPostSuccessPageModule } from './pages/sell-post-success/sell-post-success.module';
import { BuyPostSuccessPageModule } from './pages/buy-post-success/buy-post-success.module';
import { NonTradePostSuccessPageModule } from './pages/non-trade-post-success/non-trade-post-success.module';

import { CancelNonTradeHourPageModule } from './pages/cancel-non-trade-hour/cancel-non-trade-hour.module';
import { CancelInProfilePageModule } from './pages/cancel-in-profile/cancel-in-profile.module';
import { ModalEditPageModule } from './pages/modal-edit/modal-edit.module';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { EndDateModalPageModule } from './end-date-modal/end-date-modal.module';
import { InvalidInputModalPageModule } from './invalid-input-modal/invalid-input-modal.module';
import { Error404ModalPageModule } from './error404-modal/error404-modal.module';
import { NonTradeHoursAlertPageModule } from './non-trade-hours-alert/non-trade-hours-alert.module';
import { CancelOrderModal1PageModule } from './cancel-order-modal1/cancel-order-modal1.module';
import { CancelOrderModal2PageModule } from './cancel-order-modal2/cancel-order-modal2.module';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

//import { File, IWriteOptions } from '@ionic-native/file/ngx';

import {
  FileTransfer,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import {
  File
} from '@ionic-native/file/ngx';
import { EditEventModalPageModule } from './modals/edit-event-modal/edit-event-modal.module';
import { WithdrawEventModalPageModule } from './modals/withdraw-event-modal/withdraw-event-modal.module';
import { EditBidModalPageModule } from './modals/edit-bid-modal/edit-bid-modal.module';
import { DeleteModalPageModule } from './modals/delete-modal/delete-modal.module';
import { CallNumber } from '@ionic-native/call-number/ngx';


@NgModule({
  declarations: [StateModalPage, BoardModalPage, LocalityModalPage, AppComponent],
  entryComponents: [StateModalPage, BoardModalPage, LocalityModalPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({ name: '__jppdb' }),
    AppRoutingModule,
    SellPostSuccessPageModule,
    BuyPostSuccessPageModule,
    NonTradePostSuccessPageModule,
    CancelNonTradeHourPageModule,
    CancelInProfilePageModule,
    ModalEditPageModule,
    EndDateModalPageModule,
    InvalidInputModalPageModule,
    Error404ModalPageModule,
    NonTradeHoursAlertPageModule,
    CancelOrderModal1PageModule,
    CancelOrderModal2PageModule,
    EditEventModalPageModule,
    WithdrawEventModalPageModule,
    EditBidModalPageModule,
    DeleteModalPageModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    FileOpener,
    FileTransfer,
    FileTransferObject,
    File,
    CallNumber,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
