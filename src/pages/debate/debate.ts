import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { AuthService } from "../../providers/auth-service";
import {FirebaseService} from "../../providers/firebase-service";



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
  key: any;
  topics: any[];
  firebaseTopics: FirebaseListObservable<any[]>;
  users: any[];
  firebaseUsers: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, private _auth: AuthService, public loadingCtrl: LoadingController, public fb: FirebaseService) {
    this.key = this.navParams.data;
    this.topics = this.fb.topics;
    this.firebaseTopics = this.fb.firebaseTopics;
    this.users = this.fb.users;
    this.firebaseUsers = this.fb.firebaseUsers;
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad DebatePage');
  }

  proClick(): void {
    // if(this.users[this.key].chosen == "none"){
    //   this.users[this.key].chosen = "pro";
    //   this.firebaseUsers.update(this.key, {chosen: this.users[this.key].chosen});
    //
    //
    // }
    this.topics[this.key].proClicks += 1;
    this.firebaseTopics.update(this.key , {proClicks: this.topics[this.key].proClicks});
    this.calcPerc();
  }

  conClick(): void {
    this.topics[this.key].conClicks += 1;
    this.firebaseTopics.update(this.key , {conClicks: this.topics[this.key].conClicks});
    this.calcPerc();
  }

  calcPerc(): void {
    this.topics[this.key].totalClicks = this.topics[this.key].proClicks + this.topics[this.key].conClicks;
    this.firebaseTopics.update(this.key , {totalClicks: this.topics[this.key].totalClicks});
    this.topics[this.key].proPercent = Math.round((this.topics[this.key].proClicks / this.topics[this.key].totalClicks) * 100) + "%";
    this.firebaseTopics.update(this.key , {proPercent: this.topics[this.key].proPercent});
    this.topics[this.key].conPercent = Math.round((this.topics[this.key].conClicks / this.topics[this.key].totalClicks) * 100) + "%";
    this.firebaseTopics.update(this.key , {conPercent: this.topics[this.key].conPercent});
  }



}
