import { Injectable } from '@angular/core';
import {AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods, AngularFire} from 'angularfire2';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  constructor(public auth$: AngularFireAuth, public ang: AngularFire) {
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });

  }

  get authenticated(): boolean {
    return this.authState !== null;
  }
  get loggedInBool(): boolean {
    return this.ang.auth.subscribe() !== null;
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    })
  }

  signUp(email: string, password: string) {
    let creds: any = { email: email, password: password };
    return this.auth$.createUser(creds);
  }

  login(email: string, password: string): Promise<boolean> {
    let creds: any = { email: email, password: password };
    let res: Promise<boolean> = new Promise((resolve, reject) => {
      this.auth$.login(creds).then(result => {
        resolve(result);
      })
    });
    return res;
  }

  signOut(): void {
    this.auth$.logout();
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.google.displayName;
    } else {
      return '';
    }
  }

}
