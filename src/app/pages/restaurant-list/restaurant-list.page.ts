import { Component, OnInit } from '@angular/core';
import{FbserviceService} from '../../services/fbservice.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
// import {NavController, NavParams} from '@ionic/angular'

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.page.html',
  styleUrls: ['./restaurant-list.page.scss'],
})
export class RestaurantListPage implements OnInit {
  displayResurantList = [];
  CurrentPerson = new Array();
  currentUSerKey;
  constructor(private menu: MenuController,private fbservice: FbserviceService,private router: Router) {
    // this.getResurants();
    // this.getResurantProfile();
    // this.fbservice.CurrentUserrLoggedIn().then((data:any) => {
    //   this.currentUSerKey = data.uid
    //   console.log(this.currentUSerKey)
      this.getResurants();
    //   // this.getResurantProfile();
    // })
  }

  getResurantProfile() {
    this.fbservice.ResurantProfile().then((data:any) => {
    this.displayResurantList = data.uid
    console.log(this.displayResurantList)
  })
}
//   getResurantProfile() {
//       this.router.navigate(['/rest-profile']);
//       this.fbservice.ResurantProfile().then((data:any) => {
//       this.displayResurantList = data
//       console.log(this.displayResurantList)
//   })
// }
  getResurants() {
      this.fbservice.ResurantList().then((data:any) => {
      this.displayResurantList = data
      console.log(this.displayResurantList)
    })
  }
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
  }

}
