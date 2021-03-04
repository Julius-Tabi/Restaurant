import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import firebase from 'firebase';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {environment} from '../environments/environment';
// import {AngularFireModule} from '@angular/fire';
import {AuthPage} from '../app/pages/service/auth/auth.page'


firebase.initializeApp({
  apiKey: "AIzaSyD9rJkSvzr2dOJoCA7Lg0RTP-67Z2_qtAE",
  authDomain: "mulit-restaurant.firebaseapp.com",
  databaseURL: "https://mulit-restaurant.firebaseio.com",
  projectId: "mulit-restaurant",
  storageBucket: "mulit-restaurant.appspot.com",
  messagingSenderId: "314510577682",
  appId: "1:314510577682:web:fb669d0e548c296cf448cb",
  measurementId: "G-FHQ0FR8L02"
})


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    AuthPage,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
