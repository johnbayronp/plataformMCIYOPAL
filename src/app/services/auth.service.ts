import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth, public router: Router) { }

  // Login desde email y password
  loginEmailUser(email: string, pass: string) {
    return  new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  logout(){
    return this.afAuth.signOut();
  }

  isAuth(){
    return  new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(
        res=> resolve(res),
        err=> reject(err)
      );
    });
  }
  
}
