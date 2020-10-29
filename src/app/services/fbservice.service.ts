import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { from } from 'rxjs';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class FbserviceService {
  ngzone: any;
  loadingCtrl: any;
  alertCtrl: any;
  firebase: any;

  constructor(private router:Router) {
      
   }

  
  // registration 
  Signup(name, email, phone,password,Confirmpassword) {
    return new Promise((resolve, reject) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
          console.log(newUser)
          var user = firebase.auth().currentUser
          firebase.database().ref("Users/" + user.uid).set({
            name: name,
            email: email,
            password: password,
            Confirmpassword: Confirmpassword,
            phone:phone,
            // downloadurl: "../../assets/imgs/Defaults/default.jpg",
            address: "",
          })
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then(function () {
            // Email sent.
          }).catch(function (error) {
            // An error happened.
          });
          resolve();
          // loading.dismiss();
        }).catch((error) => {
          console.log(error);
        })
      // })
    })
  }
  
   SignIn(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
          resolve();
        }).catch((error) => {
          console.log(error.message)
      })
    })

  }
  
    checkVerification() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user.emailVerified == false) {
          // this.logout();
          resolve(0)
        }
        else {
          resolve(1)
        }
      })
    })
  }

  RestSignup(Restaurant, email, phone,password,Confirmpassword,address) {
    return new Promise((resolve, reject) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
          console.log(newUser)
          var user = firebase.auth().currentUser
          firebase.database().ref("Restaurant/" + user.uid).set({
            Restaurant: Restaurant,
            email: email,
            phone:phone,
            password: password,
            Confirmpassword: Confirmpassword, 
            // downloadurl: "../../assets/imgs/Defaults/default.jpg",
            address:address ,
          })
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then(function () {
            // Email sent.
          }).catch(function (error) {
            // An error happened.
          });
          resolve();
          // loading.dismiss();
        }).catch((error) => {
          console.log(error.message);
        })
      // })
    })
  }

  RestSignIn(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
          resolve();
        }).catch((error) => {
          console.log(error.message)
      })
    })

  }

  logout()
  { 
    this.firebase.signOut().then(()=>{
      this.router.navigate(['./rest-home']);
    });

    //this.firebase.auth.signOut().then(()=>{
  
      //this.router.navigate(['/home']);
  }
  
}


