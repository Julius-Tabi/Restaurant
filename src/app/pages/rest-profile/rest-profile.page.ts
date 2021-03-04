import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import{FbserviceService} from '../../services/fbservice.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NavController } from '@ionic/angular';
import { setuid } from 'process';
@Component({
  selector: 'app-rest-profile',
  templateUrl: './rest-profile.page.html',
  styleUrls: ['./rest-profile.page.scss'],
})
export class RestProfilePage implements OnInit {
   // ownerId: any;
  // restaurants: Array<any>;
  restaurants: any;
  show = false;
  
  //content = 'addRest';
  // array: any;
  x: any;
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService,private router: Router, public route: ActivatedRoute) {
   
   }
  
   ngOnInit() { 
    this.fbservice.signAuth();
    let user = firebase.auth().currentUser.uid
    console.log('user: ', user)
    
    firebase.firestore().collection('restaurants').doc(user).get().then(snapshot => {
      this.restaurants = snapshot.data();
      //console.log('new data: ', this.restaurants)
      // if(user === 'ownerId'){
      //   this.show = this.restaurants
      // }
    })
  }
  editRestaurant(){
  }
  newRestaurant(){
    this.router.navigateByUrl('/rest-profile')
  }
}

