import { Component, OnInit } from '@angular/core';
import{FbserviceService} from '../../services/fbservice.service';
import { MenuController } from '@ionic/angular';
// import {NavController, NavParams} from '@ionic/angular'

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.page.html',
  styleUrls: ['./restaurant-list.page.scss'],
})
export class RestaurantListPage implements OnInit {
  displayResurantList = [];

  constructor(private menu: MenuController,private fbservice: FbserviceService) {
    this.getResurants();
  }
  
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
