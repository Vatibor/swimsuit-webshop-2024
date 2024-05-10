import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ProductInterface} from "../models/product.interface";



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  collectionName: string = 'swimsuits';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL()
  }

  getAllProducts() {
    return this.afs.collection<ProductInterface>(this.collectionName, ref => ref.orderBy('price', 'desc')).valueChanges()
  }

  create(image_extension: string, product: ProductInterface) {
    product.id = this.afs.createId()
    product.image = 'images/' + product.id + image_extension
    return this.afs.collection<ProductInterface>(this.collectionName).doc(product.id).set(product)
  }

  image_upload_to_storage(image_url: string, file: any) {
    return this.storage.upload(image_url, file)
  }

  update(product: ProductInterface) {
    return this.afs.collection<ProductInterface>(this.collectionName).doc(product.id).set(product)
  }

  delete(id: string) {
    return this.afs.collection<ProductInterface>(this.collectionName).doc(id).delete()
  }

  getProductsBySex(sex: string) {
    return this.afs.collection<ProductInterface>(this.collectionName, ref => ref.where('sex', '==', sex)).valueChanges()
  }
}
