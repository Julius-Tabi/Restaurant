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

    firebase.firestore().collection('restaurants').doc(user).collection('bookings').where('ownerId', '==', user).orderBy('createdAt', 'desc').onSnapshot(res => {
      res.forEach(element => {
        // this.reservations.push(element.data());
        console.log('Bookings: ', this.reservations)
        this.reservations.push(Object.assign( element.data(), {uid:element.id}) );
        console.log('uuu: ' + {uid:element.id})
        console.log('u: ' + element.id)
      });
    });
  }

  //Booking status
  status(ownerId, userId, status){
    this.fbservice.bookingStatus(ownerId, userId, status);
  }
  
}
