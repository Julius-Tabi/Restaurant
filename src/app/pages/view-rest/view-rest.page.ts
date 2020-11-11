import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import{FbserviceService} from '../../services/fbservice.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-view-rest',
  templateUrl: './view-rest.page.html',
  styleUrls: ['./view-rest.page.scss'],
})
export class ViewRestPage implements OnInit {
  id:any
  displayResurantProfile = [];
  uid = this.route.snapshot.params.id;
  restaurants: any = [];
  dishes: any= [];
  constructor(private fbservice: FbserviceService,private router: Router, public route: ActivatedRoute) { 
    // this.viewProfile();
  }

  ngOnInit() {
    // this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id)
    // // this.id = this.route.snapshot.params.id
    this.id = this.route.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)
    console.log('ooo: ',this.uid)

    // fetching single restaurant
    firebase.firestore().collection('restaurants').doc(this.id).get().then(snapshot => {
      this.restaurants = snapshot.data();
      console.log('new data: ', this.restaurants)
    });

    // Fetching menus
    // firebase.firestore().collection('restaurants').doc(this.uid).collection('menu').where('ownerId', '==', this.uid).limit(3).get().then(snapshot => {
    //   snapshot.docs.forEach(menu => {
    //     this.dishes.push(menu.data())
    //     console.log('menu: ', this.dishes)
    //   })
    // })
  }
//   viewProfile() {
//     this.fbservice.ResurantProfile().then((data:any) => {
//     this.displayResurantProfile = data
//     console.log(this.displayResurantProfile)
//   })
// }
//   getResurants() {
//     this.fbservice.ResurantList().then((data:any) => {
//     this.displayResurantList = data.uid
//     console.log(this.displayResurantList)
//   })
// }
  
}
