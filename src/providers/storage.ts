import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseApp } from 'angularfire2';

/*
  Generated class for the Storage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Storage {
  storageRef: any;
  constructor(@Inject(FirebaseApp) firebaseApp: any) {
    this.storageRef = firebaseApp.storage().ref();
  }
  uploadImage(name) {
    let profileRef = this.storageRef.child('images/profile.jpg');

  }
}
