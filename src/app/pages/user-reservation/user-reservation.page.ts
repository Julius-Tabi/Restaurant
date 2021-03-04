import { Component, OnInit } from '@angular/core';
import{FbserviceService} from '../../services/fbservice.service';
import { MenuController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.page.html',
  styleUrls: ['./user-reservation.page.scss'],
})
export class UserReservationPage implements OnInit {

  reservations: Array<any> = [];
  // restaurants: any;
  id: any;
  userId: any
  user_Id:any
  constructor(private fbservice: FbserviceService,private router: Router,public nav: NavController,
    public loadingCtrl: LoadingController,private alertCtrl: AlertController) { }

  // ngOnInit() {
  //   var user = firebase.auth().currentUser
  //   this.userId = user.uid
  //   console.log('user: ', user);

  //   const userBookings = firebase.firestore().collectionGroup('bookings').where('userId', '==', this.userId).orderBy('date', 'desc');
  //   userBookings.get().then(querySnapshot => {
  //     querySnapshot.forEach(doc => {
  //       this.reservations.push(doc.data())
  //       console.info('doc-id: ', doc.id, '=>', 'doc-data: ', doc.data());
  //       console.log('userBookings: ', this.reservations)
  //     })
  //   })
  // }
  ngOnInit() {
    this.fbservice.signAuth();
    let user = firebase.auth().currentUser;
    this.userId = user.uid;
    console.log('user id Booked: ', user)
    const userBookings = firebase.firestore().collectionGroup('bookings').where('userId', '==', this.userId).orderBy('createdAt', 'desc');
    userBookings.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.reservations.push(Object.assign( doc.data(), {uid:doc.id}) )
        this.user_Id = {uid:doc.id}
        console.log('user_idd: ', this.user_Id)
        // console.log('doc-id: ', {uid:doc.id}, '=>', 'doc-data: ', doc.data());
        // console.log('userBookings: ', this.booking)
      })
    })
  }
  async statuses(ownerId, userId, status){
    const alert = await this.alertCtrl.create({
      message: `Are you sure you want to cancel your booking?.`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm No: ', blah);
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.fbservice.bookingStatus(ownerId, userId, status);
          }
        }
      ]
    });
    return await alert.present();
  }
 status(ownerId, userId, status){
    this.fbservice.bookingStatus(ownerId, userId, status);
  }
}
