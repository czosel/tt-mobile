import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ClubPage } from '../pages/club/club';
import { PlayerPage } from '../pages/player/player';
import { ContactPage } from '../pages/contact/contact';
import { LeaguePage } from '../pages/league/league';
import { HomePage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';
import { ShortDatePipe } from '../pipes/short-date';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ClubPage,
    PlayerPage,
    ContactPage,
    HomePage,
    LeaguePage,
    GamePage,
    TabsPage,
    ShortDatePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ClubPage,
    PlayerPage,
    ContactPage,
    HomePage,
    LeaguePage,
    GamePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
