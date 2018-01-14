import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WaitersPage } from '../pages/waiters/waiters';
import { VotationPage } from '../pages/votation/votation';
import { VotationSuccessPage } from '../pages/votation/success';

import { CameraPreview } from '@ionic-native/camera-preview';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WaitersPage,
    VotationPage,
    VotationSuccessPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WaitersPage,
    VotationPage,
    VotationSuccessPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}