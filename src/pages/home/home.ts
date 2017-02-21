import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SettingsPage} from "../settings/settings";
import {LoadingController} from "ionic-angular/index";
import {DebatePage} from "../debate/debate";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController) {}

  ionViewDidLoad() {
    // let loader = this.loadingController.create({
    //   content: 'Getting data...'
    // });

    console.log('ionViewDidLoad HomePage');
  }

  goToSettings(): void {
    this.navCtrl.push(SettingsPage);
  }

  openTopic($event, topic): void {
    this.navCtrl.push(DebatePage, topic);
  }

  politicalTopics: Object[] = [
    {
      name: "Gun Control"
    },
    {
      name: "Abortion"
    },
    {
      name: "Illegal Immigration"
    },
    {
      name: "Death Penalty"
    },
    {
      name: "School Uniforms"
    }
  ];

  entertainmentTopics: Object[] = [
    {
      name: "Batman vs. Superman"
    },
    {
      name: "Video Games and Violence"
    }
  ]

}

//http://www.createdebate.com/browse/debaterss/

// topic: "Gun Control",
//   topic: "Abortion",
//   topic: "Illegal Immigration",
//   topic: "Death Penalty", topic: "School Uniforms"];
