import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, MenuController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthService } from '../providers/auth-service';
import {HomePage, TermsPage, SettingsPage, LoginPage, DebatePage} from '../pages/pages';


@Component({
  templateUrl: 'app.html',
  providers: [AuthService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;      //PUT ROOT PAGE IMPORTED HERE NOT IN QUOTES
  sub: any;
  fromLogin: boolean;

  constructor(public platform: Platform, private _auth: AuthService, private menu: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation

  }

  ionViewDidEnter(): void {
    this.menu.swipeEnable(false, "menu");
  }

  initializeApp() {
    this.fromLogin = false;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.sub = this._auth.authenticated().subscribe(authResp =>
      {
        console.log(authResp);
        if(authResp == null) {
          this.fromLogin = true;
          this.nav.setRoot(LoginPage);
        }else {
          if(this.fromLogin) {
            this.nav.setRoot(TermsPage);
          } else {
            this.nav.setRoot(HomePage);
          }
        }

      });

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
