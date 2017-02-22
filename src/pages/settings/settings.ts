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

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Passwords Don\'t match!',
      subTitle: 'Check your Passwords and try again!',
      buttons: ['OK']
    });
    alert.present();
  }
  showColorAlert() {
    let blind = this.alertCtrl.create({
      title: 'You Been Pranked!',
      subTitle: 'Here at DebateApp we believe in color blind & non-color blind people living in harmony. This is why we make all our Websites and Apps colorblind friendly to begin with.',
      buttons: [
          {text: 'OK'},
        {text: 'I hate you',
          handler: () => {
            this.crashSite()
          }
        }
      ]
    });
    blind.present();
  }
   private crashSite() : void {
     let check = this.alertCtrl.create({
       title: 'Check Yourself Before You Wreck Yourself!',
       subTitle: 'Check your Passwords and try again!',
       buttons: [
         {text: 'I go to my Death',
           handler: () => {
            this.dead()
          }
         }
       ]
     });
     check.present();
    };
  private dead() : void {

    setTimeout(function () {
      // I need a function that will crash the website, but still allow it to run before the button is pressed
      window.open("________You_Are_Now_Dead........Because_we_hate_you_____")
    }, 2000);
  };
}

// @Component ({
//   template: `
//  <ion-header>
//
//  <ion-navbar>
//  <ion-title>Add New Profile Image</ion-title>
//     </ion-navbar>
//
//     </ion-header>
//
//
//     <ion-content>
//
//   <button ion-button>
//   <span showWhen="ios"> Cancel</span>
//   <ion-icon showWhen="android, windows"></ion-icon>
//   </button>
//
//   </ion-content>
//   `
// })
// export class ImagePage{
//
//   constructor(private params: NavParams) {
//   }
// }









