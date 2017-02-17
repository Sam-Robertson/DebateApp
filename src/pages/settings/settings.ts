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
 templateUrl: 'p-image.html'
})
class ImagePage{

  constructor(private params: NavParams) {
  }
}









