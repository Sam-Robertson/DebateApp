import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from "angularfire2";


/*
  Generated class for the Debate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-debate',
  templateUrl: 'debate.html'
})
export class DebatePage {
  topics: any[];
  key: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    this.key = this.navParams.data;
    af.database.list("/topics").subscribe(data => {
      this.topics = data;
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad DebatePage');
  }

  proClick(): void {
    this.topics[this.key].proClicks += 1;
    this.calcPerc();
  }

  conClick(): void {
    this.topics[this.key].conClicks += 1;
    this.calcPerc();
  }

  calcPerc(): void {
    this.topics[this.key].totalClicks = this.topics[this.key].proClicks + this.topics[this.key].conClicks;
    this.topics[this.key].proPercent = Math.round((this.topics[this.key].proClicks / this.topics[this.key].totalClicks) * 100) + "%";
    this.topics[this.key].conPercent = Math.round((this.topics[this.key].conClicks / this.topics[this.key].totalClicks) * 100) + "%";
  }

}
