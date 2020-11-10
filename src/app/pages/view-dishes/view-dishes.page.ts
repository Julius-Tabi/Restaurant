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
  restaurants: any = [];
  dishes: any= [];
  ownerId:any
  constructor(private fbservice: FbserviceService,private router: Router, public route: ActivatedRoute) { }
 

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)
    console.log(this.uid)
      // Fetching menus
    firebase.firestore().collection('restaurants').doc(this.uid).collection('menu').where('ownerId', '==', this.uid).limit(3).get().then(snapshot => {
      snapshot.docs.forEach(menu => {
        this.dishes.push(menu.data())
        console.log('menu: ', this.dishes)
      })
    })
  }
}

