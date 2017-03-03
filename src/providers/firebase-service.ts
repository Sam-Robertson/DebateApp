import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from "angularfire2";

/*
  Generated class for the FirebaseService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseService {
  topics: any[];
  firebaseTopics: FirebaseListObservable<any[]>;
  constructor(public http: Http, public af: AngularFire) {

    console.log('Hello FirebaseService Provider');
    this.firebaseTopics = af.database.list("/topics");
    this.firebaseTopics.subscribe(data => {
      this.topics = data;

    });
  }

}
