import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {ModalController} from 'ionic-angular';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Passwords Don\'t match!',
      subTitle: 'Check your Passwords and try again!',
      buttons: ['OK']
    });
    alert.present();
  }
  addProfileImage(){
    let modal = this.modalCtrl.create(ImagePage);
    modal.present();
  }

}

@Component ({
  template: `
 <ion-header>

 <ion-navbar>
 <ion-title>Add New Profile Image</ion-title>
    </ion-navbar>

    </ion-header>


    <ion-content padding>

  <button ion-button>
  <span ion-text color="primary" showWhen="ios">Cancel</span>
  <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
  </button>

  </ion-content>
  `
})
export class ImagePage{

  constructor(private params: NavParams) {
  }
}









