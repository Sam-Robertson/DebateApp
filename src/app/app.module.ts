import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HomePage, DebatePage, LoginPage, SettingsPage, TermsPage} from '../pages/pages';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DebatePage,
    LoginPage,
    SettingsPage,
    TermsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DebatePage,
    LoginPage,
    SettingsPage,
    TermsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
