import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import{FbserviceService} from '../../services/fbservice.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  // ownerId: any;
  // restaurants: Array<any>;
  userProfile: any;
  show = false;
  
  //content = 'addRest';
  // array: any;
  x: any
  constructor(private fbservice: FbserviceService,private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.fbservice.signAuth();
    let user = firebase.auth().currentUser.uid
    console.log('user: ', user)
    
    firebase.firestore().collection('Users').doc(user).get().then(snapshot => {
      this.userProfile = snapshot.data();
      //console.log('new data: ', this.restaurants)
      // if(user === 'ownerId'){
      //   this.show = this.restaurants
      // }
    })
  }

}
