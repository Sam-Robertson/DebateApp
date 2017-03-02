import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { AuthService } from "../../providers/auth-service";
import {FirebaseService} from "../../providers/firebase-service";
import {Toast} from "ionic-native";


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
    this.firebaseUsers = af.database.list("/users/" + _auth.uId + "/topics");
    this.firebaseUsers.subscribe(data => {
      this.users = data;
    });
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad DebatePage');
  }

  proClick(): void {
    if(this.users[this.key].chosen == "none"){
      this.users[this.key].chosen = "pro";
      this.firebaseUsers.update(this.key, {chosen: this.users[this.key].chosen});

      this.topics[this.key].proClicks += 1;
      this.firebaseTopics.update(this.key , {proClicks: this.topics[this.key].proClicks});
      this.calcPerc();
    } else {
      Toast.show("You already voted. You can't change your vote", "5000", "center").subscribe(
        toast => {
          console.log(toast)
        }
      );
    }
  }

  conClick(): void {
    if(this.users[this.key].chosen == "none"){
      this.users[this.key].chosen = "con";
      this.firebaseUsers.update(this.key, {chosen: this.users[this.key].chosen});

      this.topics[this.key].conClicks += 1;
      this.firebaseTopics.update(this.key , {conClicks: this.topics[this.key].conClicks});
      this.calcPerc();
    }
  }

  calcPerc(): void {
    this.topics[this.key].totalClicks = this.topics[this.key].proClicks + this.topics[this.key].conClicks;
    this.firebaseTopics.update(this.key , {totalClicks: this.topics[this.key].totalClicks});
    this.topics[this.key].proPercent = Math.round((this.topics[this.key].proClicks / this.topics[this.key].totalClicks) * 100) + "%";
    this.firebaseTopics.update(this.key , {proPercent: this.topics[this.key].proPercent});
    this.topics[this.key].conPercent = Math.round((this.topics[this.key].conClicks / this.topics[this.key].totalClicks) * 100) + "%";
    this.firebaseTopics.update(this.key , {conPercent: this.topics[this.key].conPercent});
  }

  reset(): void {
    this.topics[this.key].proPercent = "0%";
    this.topics[this.key].conPercent = "0%";
    this.topics[this.key].conClicks = 0;
    this.topics[this.key].proClicks = 0;
    this.topics[this.key].totalClicks = 0;
    this.firebaseTopics.update(this.key , {proPercent: this.topics[this.key].proPercent});
    this.firebaseTopics.update(this.key , {conPercent: this.topics[this.key].conPercent});
    this.firebaseTopics.update(this.key , {conClicks: this.topics[this.key].conClicks});
    this.firebaseTopics.update(this.key , {proClicks: this.topics[this.key].proClicks});
    this.firebaseTopics.update(this.key , {totalClicks: this.topics[this.key].totalClicks});
  }
  // this is a comment, for update purposes
}
