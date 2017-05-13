import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ClubPage } from '../pages/club/club';
import { PlayerPage } from '../pages/player/player';
import { LeaguePage } from '../pages/league/league';
import { HomePage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';
import { TabsPage } from '../pages/tabs/tabs';
import { EloChartComponent } from '../components/elo-chart/elo-chart';
import { EloPipe } from '../pipes/elo';
import { ShortDatePipe } from '../pipes/short-date';
import { Elo } from '../providers/elo'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ClubPage,
    PlayerPage,
    HomePage,
    LeaguePage,
    GamePage,
    TabsPage,
    ShortDatePipe,
    EloPipe,
    EloChartComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    NgxChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ClubPage,
    PlayerPage,
    HomePage,
    LeaguePage,
    GamePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    Elo,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
