import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import{FbserviceService} from '../../services/fbservice.service';
import {AuthPage} from '../service/auth/auth.page'
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-rest-home',
  templateUrl: './rest-home.page.html',
  styleUrls: ['./rest-home.page.scss'],
})
export class RestHomePage implements OnInit {
  id:any
  displayResurantProfile = [];
  uid = this.route.snapshot.params.id;
  restaurants: any = [];
  dishes: any= [];
  constructor(private fbservice: FbserviceService,private router: Router,public nav: NavController,
    public loadingCtrl: LoadingController,private alertCtrl: AlertController, public route: ActivatedRoute) {
    // this.fbservice.CurrentUserrLoggedIn().then((data:any) => {
    //   // console.log(this.uid)
    //   this.CurrentPerson = data
    //     console.log(this.CurrentPerson)
    // })

  this.fbservice.getUid();
  }

  ngOnInit() {
    // this.id = this.route.snapshot.paramMap.get('id')
    // console.log('ID: ', this.id)
    // console.log(this.uid)
    //   // Fetching menus
    // firebase.firestore().collection('restaurants').doc(this.uid).collection('menu').where('ownerId', '==', this.uid).limit(3).get().then(snapshot => {
    //   snapshot.docs.forEach(menu => {
    //     this.dishes.push(menu.data())
    //     console.log('menu: ', this.dishes)
    //   })
    // })
  }
  Logout(){
  
  }
}
