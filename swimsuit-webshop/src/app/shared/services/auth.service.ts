import { Injectable, signal} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserInterface} from "../models/user.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }


  register(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout(){
    return this.auth.signOut()
  }

  isUserLoggedIn() {
    return this.auth.user
  }
}
