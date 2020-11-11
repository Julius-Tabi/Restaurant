import { Component, OnInit } from '@angular/core';
import{FbserviceService} from '../../services/fbservice.service';
import { MenuController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.page.html',
  styleUrls: ['./view-reservation.page.scss'],
})
export class ViewReservationPage implements OnInit {
  reservations: Array<any> = [];
  // restaurants: any;
  id: any;
  constructor(private menu: MenuController,private fbservice: FbserviceService,private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    let user = firebase.auth().currentUser.uid
    console.log('user: ', user)

    firebase.firestore().collection('restaurants').doc(user).collection('bookings').onSnapshot(res => {
      res.forEach(element => {
        this.reservations.push(element.data());
        console.log('Bookings: ', this.reservations)
      });
    });
  }

}
