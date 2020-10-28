import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FbserviceService {
  ngzone: any;
  loadingCtrl: any;
  alertCtrl: any;

  constructor() { }

  Signup(email, password, name) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Signing up...',
          duration: 4000000
        });
        loading.present();
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
          var user = firebase.auth().currentUser
          firebase.database().ref("profiles/" + user.uid).set({
            name: name,
            email: email,
            downloadurl: "../../assets/imgs/Defaults/default.jpg",
            address: "",
          })
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then(function () {
            // Email sent.
          }).catch(function (error) {
            // An error happened.
          });
          resolve();
          loading.dismiss();
        }).catch((error) => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            subTitle: error.message,
            cssClass: 'myAlert',
            buttons: [
              {
                text: 'ok',
                handler: data => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          alert.present();
          console.log(error);
        })
      })
    })
  }
}
