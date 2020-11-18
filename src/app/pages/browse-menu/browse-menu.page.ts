import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import{FbserviceService} from '../../services/fbservice.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-browse-menu',
  templateUrl: './browse-menu.page.html',
  styleUrls: ['./browse-menu.page.scss'],
})
export class BrowseMenuPage implements OnInit {
  id:any
  uid = this.route.snapshot.params.id;
  dishes: any = [];
   drinks: any = [];
  ownerId: any
  restaurants: any = [];
  constructor(private fbservice: FbserviceService,private router: Router, public route: ActivatedRoute) { }
   options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  Drinks = {
    slidesPerView: 2.5,
  };

  ngOnInit() {
    this.fbservice.signAuth();
    let user = firebase.auth().currentUser.uid
    console.log('user: ', user)
    console.log('OwnerIDDD:' , this.uid)
    // let user = firebase.auth().currentUser.uid;
    // this.id = user.uid
      // Fetching menus
    firebase.firestore().collection('restaurants').doc(this.uid).collection('menu').where('ownerId', '==', this.uid).limit(3).get().then(snapshot => {
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
    
      this.id = this.route.snapshot.paramMap.get('id')
       console.log('ID: ', this.id)
       console.log('ooo: ',this.uid)

    // fetching single restaurant
      firebase.firestore().collection('restaurants').doc(this.id).get().then(snapshot => {
      this.restaurants = snapshot.data();
      console.log('new data: ', this.restaurants)
    });
  }
}
