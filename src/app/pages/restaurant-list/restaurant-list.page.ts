import { Component, OnInit } from '@angular/core';
import{FbserviceService} from '../../services/fbservice.service';
import { MenuController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
// import {NavController, NavParams} from '@ionic/angular'

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.page.html',
  styleUrls: ['./restaurant-list.page.scss'],
})
export class RestaurantListPage implements OnInit {
  // displayResurantList = [];
  restaurants: Array<any> = [];
  // restaurants: any;
  id: any;
  // Uid:any= this.route.snapshot.params.id;

  constructor(private menu: MenuController,private fbservice: FbserviceService,private router: Router, public route: ActivatedRoute) {
    // this.getResurants();
    // this.getResurantProfile();
    // this.fbservice.CurrentUserrLoggedIn().then((data:any) => {
    //   this.currentUSerKey = data.uid
    //   console.log(this.currentUSerKey)
      // this.getResurants();
      // this.viewProfile();
    //   // this.getResurantProfile();
    // })
  }

//   viewProfile() {
//     this.fbservice.ResurantProfile().then((data:any) => {
//     this.displayResurantProfile = data
//     console.log(this.displayResurantProfile)
//   })
// }

  // getResurants() {
  //     this.fbservice.ResurantList().then((data:any) => {
  //     this.displayResurantList = data
  //     console.log(this.displayResurantList)
  //   })
  // }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnInit() {
    firebase.firestore().collection('restaurants').onSnapshot(res => {
      res.forEach(element => {
        this.restaurants.push(element.data());
      });
    });
  }
 
}
