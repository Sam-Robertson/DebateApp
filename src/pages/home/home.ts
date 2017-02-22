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


  goToSettings(): void {
    this.navCtrl.push(SettingsPage);
  }

  openTopic($event, topic): void {
    this.navCtrl.push(DebatePage, topic);
  }

  topics: Object[] = [
    {
      name: "Gun Control",
      type: "Politics",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Drinking Age - Lower it?",
      type: "Politics",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Abortion",
      type: "Politics",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Under God in the Pledge",
      type: "Politics",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Illegal Immigration",
      type: "Politics",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Death Penalty",
      type: "Politics",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "School Uniforms",
      type: "Politics",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Recreational Marijuana",
      type: "Politics",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Batman vs. Superman",
      type: "Entertainment",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Video Games and Violence",
      type: "Entertainment",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Social Networking - Good or Bad?",
      type: "Entertainment",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Animal Testing",
      type: "Science and Technology",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Cell Phones - Are They Safe?",
      type: "Science and Technology",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Alternate Energy vs Fossil Fuels",
      type: "Science and Technology",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Gay Marriage",
      type: "Sex and Gender",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
    {
      name: "Prostitution - Legalize it?",
      type: "Sex and Gender",
      totalClicks: 0,
      proClicks: 0,
      conClicks: 0,
      proPercent: "0%",
      conPercent: "0%"
    },
  ];
}

//http://www.createdebate.com/browse/debaterss/

// topic: "Gun Control",
//   topic: "Abortion",
//   topic: "Illegal Immigration",
//   topic: "Death Penalty", topic: "School Uniforms"];
