import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConnectivityService } from '../providers/connectivity-service/connectivity-service';

import { AngularFireModule } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyARx2g6roaED1RwjTZmNU2UXlPYkQrgNl4",
  authDomain: "open-ateliers-nieuwmarkt-64e5e.firebaseapp.com",
  databaseURL: "https://open-ateliers-nieuwmarkt-64e5e.firebaseio.com/",
  projectId: "open-ateliers-nieuwmarkt-64e5e",
  storageBucket: "open-ateliers-nieuwmarkt-64e5e.appspot.com",
  messagingSenderId: "682545579648"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityService
  ]
})
export class AppModule {}
