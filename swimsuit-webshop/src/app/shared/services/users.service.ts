import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {UserInterface} from "../models/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName: string = 'Users'

  constructor(private afs: AngularFirestore) {
  }

  create(user: UserInterface) {
    return this.afs.collection<UserInterface>(this.collectionName).doc(user.id).set(user)
  }

  getById(id: string) {
    return this.afs.collection<UserInterface>(this.collectionName).doc(id).valueChanges()
  }
}
