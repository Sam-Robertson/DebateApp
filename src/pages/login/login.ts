import { Component } from '@angular/core';
import { NavParams, Nav, LoadingController } from 'ionic-angular';
import { TermsPage } from '../pages';
import { AuthService } from '../../providers/auth-service';
// import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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

  form: any;
  error: any;

  constructor(public nav: Nav, public navParams: NavParams, private _auth: AuthService, public loadingCtrl: LoadingController) {
    this.form = {
      email: '',
      password: ''
    }
  }


  signInWithGoogle(): void {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    loader.present();
    this._auth.signInWithGoogle()
      .then(() => {
      loader.dismiss();
        console.log("Google display name ",this._auth.displayName());
        this.nav.setRoot(TermsPage);

    });
  }

  register(): void{
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
  loader.present();
    this._auth.registerUser(this.form).subscribe(registerData => {
      this._auth.loginWithEmail(registerData).subscribe(loginData => {
        setTimeout(() => {
          loader.dismiss();
          this.nav.setRoot(TermsPage);
        }, 1000);
      }, loginError => {
        setTimeout(() => {
          loader.dismiss();
          this.error = loginError;
        }, 1000);
      });
    }, registerError => {
      setTimeout(() => {
        loader.dismiss();
        this.error = registerError;
      }, 1000);
    });
  }


loginEmail(): void {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();

  this._auth.loginWithEmail(this.form).subscribe(data => {
    setTimeout(() => {
      loading.dismiss();
      // The auth subscribe method inside the app.ts will handle the page switch to home
    }, 1000);
  }, err => {
    setTimeout(() => {
      loading.dismiss();
      this.error = err;
    }, 1000);
  });
}




}
