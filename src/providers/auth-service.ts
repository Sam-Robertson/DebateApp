import { Injectable } from '@angular/core';
import {AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods, AngularFire} from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from './firebase-service';

@Injectable()
export class AuthService{
  private authState: FirebaseAuthState;

  constructor(public auth$: AngularFireAuth, public ang: AngularFire, private _database: FirebaseService) {

    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });




  authenticated(): Observable<any> {
    return this.auth$;
  }

  get uId() {
    return this.auth$.getAuth().uid;
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
  }

  registerUser(credentials: any) {

    let topics: any = {};

    let i = 0;
    this._database.topics.forEach((key: any) => {
        topics[i] = {
          name: key.name,
          chosen: 'none'
        };
        i++;
    });

    return Observable.create(observer => {
      this.ang.auth.createUser(credentials).then((authData: any) => {
        this.ang.database.list('users').update(authData.uid, {
          name: authData.auth.email,
          email: authData.auth.email,
          emailVerified: false,
          provider: 'email',
          image: '//////url///////',
          topics: topics
        });
        credentials.created = true;
        observer.next(credentials);
      }).catch((error: any) => {
        if (error) {
          console.log(error);
          switch (error.code) {
            case 'INVALID_EMAIL':
              observer.error('E-mail invalid.');
              break;
            case 'EMAIL_TAKEN':
              observer.error('Email is already in use');
              break;
            case 'NETWORK_ERROR':
              observer.error('Could not connect. Please try again later.');
              break;
            default:
              observer.error(error);
          }
        }
      });
    });
  }
  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.ang.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
  signOut(): void {
    this.auth$.logout();
  }

  displayName(): string {
    if (this.authState != null) {
      return this.auth$.getAuth().auth.displayName;
    } else {
      return '';
    }
  }

}
