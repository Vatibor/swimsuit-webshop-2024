import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {AngularFireModule, FIREBASE_OPTIONS} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";


const firebaseConfig = { }


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom([
      AngularFireModule.initializeApp(firebaseConfig),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
    ]),
    [
      { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
      {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "top",}}]
  ]
};
