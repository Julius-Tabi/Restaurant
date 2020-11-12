import { Component, OnInit } from '@angular/core';
import{FbserviceService} from '../../services/fbservice.service';
import { MenuController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.page.html',
  styleUrls: ['./user-reservation.page.scss'],
})
export class UserReservationPage implements OnInit {

  reservations: Array<any> = [];
  // restaurants: any;
  id: any;
userId:any
  constructor(private menu: MenuController,private fbservice: FbserviceService,private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    var user = firebase.auth().currentUser
    this.userId = user.uid
    console.log('user: ', user)

    // firebase.firestore().collection('restaurants').doc(user).collection('bookings').onSnapshot(res => {
    //   res.forEach(element => {
    //     this.reservations.push(element.data());
    //     console.log('Bookings: ', this.reservations)
    //   });
    // });

    // .where('userId', '==', this.userId).orderBy('date', 'desc')

    const userBookings = firebase.firestore().collectionGroup('bookings').where('userId', '==', this.userId).orderBy('date', 'desc');
    userBookings.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.reservations.push(doc.data())
        console.info('doc-id: ', doc.id, '=>', 'doc-data: ', doc.data());
        console.log('userBookings: ', this.reservations)
      })
    })
  }

}
