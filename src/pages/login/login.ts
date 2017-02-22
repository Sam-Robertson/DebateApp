import { Component } from '@angular/core';
import { NavController, NavParams, Nav, LoadingController } from 'ionic-angular';
import { TermsPage } from '../pages';
import { AuthService } from '../../providers/auth-service';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public nav: Nav, public navParams: NavParams, private _auth: AuthService, public loadingCtrl: LoadingController) {}


  signInWithGoogle(): void {
    this.presentLoading();
    this._auth.signInWithGoogle()
      .then(() => {
        console.log("Google display name ",this._auth.displayName());
        this.nav.setRoot(TermsPage);

    });
  }

  presentLoading(): void {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 50000,
      dismissOnPageChange: true
    });
    loader.present();
  }


}
