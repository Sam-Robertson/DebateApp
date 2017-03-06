import { Component } from '@angular/core';
import {NavController, NavParams, Nav} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import {LoginPage} from '../pages';
import {AuthService} from '../../providers/auth-service';



@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'

})
export class SettingsPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController, public nav: Nav,
              private _auth: AuthService) {
  }

  username: string = this._auth.displayName();

  // initials =  I need to filter the username in order to get the initials

  showColorAlert() {
    let blind = this.alertCtrl.create({
      title: 'You Been Pranked!',
      subTitle: 'Here at DebateApp we believe in color blind & non-color blind people living in harmony. This is why we make all our Websites and Apps colorblind friendly to begin with.',
      buttons: [
        {text: 'OK'},
        {
          text: 'I hate you',
          handler: () => {
            this.crashSite()
          }
        }
      ]
    });
    blind.present();
  }

  logout(): void {
    this._auth.signOut();
    this.nav.setRoot(LoginPage);
  }

  private crashSite(): void {
    let check = this.alertCtrl.create({
      title: 'Check Yourself Before You Wreck Yourself!',
      subTitle: 'This Website will not be kind to you from now on!',
      buttons: [
        {
          text: 'I go to my Death',
          handler: () => {
            this.dead()
          }
        }
      ]
    });
    check.present();
  };

  private dead(): void {

    setTimeout(function () {
      window.open("________You_Are_Now_Dead______Because_we_hate_you_____")
    }, 1500);
  };
}









