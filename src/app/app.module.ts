import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CompararPage } from '../pages/comparar/comparar';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { TotalPage } from '../pages/total/total';
import { DataBaseProvider } from '../providers/data-base/data-base';

@NgModule({
  declarations: [
    MyApp,
    CompararPage,
    FavoritosPage,
    TotalPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CompararPage,
    FavoritosPage,
    TotalPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataBaseProvider
  ]
})
export class AppModule {}
