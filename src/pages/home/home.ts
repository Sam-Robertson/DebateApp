import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from "../settings/settings";
import { LoadingController } from "ionic-angular/index";
import { DebatePage } from "../debate/debate";
import { AngularFire } from "angularfire2";

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public arrayOfKeys;
  topics: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController, public af: AngularFire) {
    af.database.list("/topics").subscribe(data => {
      this.topics = data;
      this.arrayOfKeys = Object.keys(this.topics);
    });
  }


  goToSettings(): void {
    this.navCtrl.push(SettingsPage);
  }

  openTopic($event, topic): void {
    this.navCtrl.push(DebatePage, topic);
  }
}

//https://debate-app-72076.firebaseio.com/topics/#/property
