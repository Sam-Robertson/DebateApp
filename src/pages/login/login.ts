import { Component } from '@angular/core';
import { NavParams, Nav, LoadingController } from 'ionic-angular';
import { TermsPage } from '../pages';
import { AuthService } from '../../providers/auth-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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

  private myForm : FormGroup;

  constructor(private formBuilder: FormBuilder, public nav: Nav, public navParams: NavParams, private _auth: AuthService, public loadingCtrl: LoadingController) {

    let emailRegEx = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';

    this.myForm = formBuilder.group({
        email: ['', Validators.compose([Validators.pattern(emailRegEx), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });

  }


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
