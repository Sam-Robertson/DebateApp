import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthService } from '../providers/auth-service';
import {HomePage, TermsPage, SettingsPage, LoginPage, DebatePage} from '../pages/pages';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;      //PUT ROOT PAGE IMPORTED HERE NOT IN QUOTES


  constructor(public platform: Platform, private _auth: AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      if(!this._auth.loggedInBool) {
          //route to login
        this.nav.setRoot(LoginPage);
      }
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  goToTerms(): void {
    this.nav.push(TermsPage)
}

goToSettings(): void {
    this.nav.push(SettingsPage)
}
goToLogin(): void {
    this.nav.push(LoginPage)
}
goToDebate(): void {
    this.nav.push(DebatePage)
}
goToHome(): void {
    this.nav.push(HomePage)
}
logout(): void{
    this._auth.signOut();
    this.nav.setRoot(LoginPage);
}


}
