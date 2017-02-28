import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {AuthService} from "./auth-service";

/*
  Generated class for the FirebaseService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseService {
  topics: any[];
  firebaseTopics: FirebaseListObservable<any[]>;
  users: any[];
  firebaseUsers: FirebaseListObservable<any[]>;
  constructor(public http: Http, public af: AngularFire, public _auth: AuthService) {
    console.log('Hello FirebaseService Provider');
    this.firebaseTopics = af.database.list("/topics");
    this.firebaseTopics.subscribe(data => {
      this.topics = data;

    });
    this.firebaseUsers = af.database.list("/users/" + _auth.uId + "/topics");
    this.firebaseUsers.subscribe(data => {
      this.users = data;
    });
  }
}
