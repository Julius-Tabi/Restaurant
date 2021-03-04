import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import{FbserviceService} from '../../services/fbservice.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-view-dishes',
  templateUrl: './view-dishes.page.html',
  styleUrls: ['./view-dishes.page.scss'],
})
export class ViewDishesPage implements OnInit {

  id:any
  uid = this.route.snapshot.params.id;
  dishes: any = [];
  ownerId: any
   drinks: any = [];
  constructor(public fbservice: FbserviceService,private router: Router, public route: ActivatedRoute) { }
 

  ngOnInit() {
    this.fbservice.signAuth();
    let user = firebase.auth().currentUser.uid
    console.log('user: ', user)
    // let user = firebase.auth().currentUser.uid;
    // this.id = user.uid
      // Fetching menus
    firebase.firestore().collection('restaurants').doc(user).collection('menu').where('ownerId', '==', user).limit(3).get().then(snapshot => {
      snapshot.docs.forEach(menu => {
        this.dishes.push(menu.data())
        console.log('menu: ', this.dishes)
      })
    })
       firebase.firestore().collection('restaurants').doc(this.uid).collection('Drinks').where('ownerId', '==', this.uid).limit(3).get().then(snapshot => {
      snapshot.docs.forEach(Drinks => {
        this.drinks.push(Drinks.data())
        console.log('Drinks: ', this.drinks)
      })
        })
  }
}

