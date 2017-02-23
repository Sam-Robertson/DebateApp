import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  topic: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.topic = this.navParams.data;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad DebatePage');
  }

  proClick(): void {
    this.topic.proClicks += 1;
    this.calcPerc();
  }

  conClick(): void {
    this.topic.conClicks += 1;
    this.calcPerc();
  }

  calcPerc(): void {
    this.topic.totalClicks = this.topic.proClicks + this.topic.conClicks;
    this.topic.proPercent = Math.round((this.topic.proClicks / this.topic.totalClicks) * 100) + "%";
    this.topic.conPercent = Math.round((this.topic.conClicks / this.topic.totalClicks) * 100) + "%";
  }

}
