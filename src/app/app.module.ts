import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from '../providers/auth-service';


import {HomePage, DebatePage, LoginPage, SettingsPage, TermsPage} from '../pages/pages';
import {FirebaseService} from "../providers/firebase-service";


export const firebaseConfig = {
  apiKey: "AIzaSyAx0RQLYviqQsZkuvP_ACJQ6iF5Ls0uxeM",
  authDomain: "debate-app-72076.firebaseapp.com",
  databaseURL: "https://debate-app-72076.firebaseio.com",
  storageBucket: "debate-app-72076.appspot.com",
  messagingSenderId: "167617665383"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DebatePage,
    LoginPage,
    SettingsPage,
    TermsPage,
    ImagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DebatePage,
    LoginPage,
    SettingsPage,
    TermsPage,
    ImagePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, FirebaseService]
})
export class AppModule {}
