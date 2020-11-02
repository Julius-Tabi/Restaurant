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
  auth = firebase.auth();
  arr = [];
  resArr = new Array()
  constructor(private router:Router) {
      
   }

  
  // registration 
  Signup(name, email, phone,password,Confirmpassword) {
    return new Promise((resolve, reject) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
          console.log(newUser)
          var user = firebase.auth().currentUser
          firebase.database().ref("Users/" + newUser.user.uid).set({
            name: name,
            email: email,
            password: password,
            Confirmpassword: Confirmpassword,
            phone: phone,
            // downloadurl: "../../assets/imgs/Defaults/default.jpg",
            address: "",
          });
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

  RestOwnerSignup(email,password) {
    return new Promise((resolve, reject) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
          console.log(newUser)
          var user = firebase.auth().currentUser
          firebase.database().ref("Restaurant-Owner/" + user.uid).set({
            email: email,
            password: password,
            uid:user.uid
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

  AddResturant(Restaurant,Profilepic, address) {
    return new Promise((resolve, reject) => {
          var user = firebase.auth().currentUser
          firebase.database().ref("Restaurant/" + user.uid).push({
            Restaurant: Restaurant,
            Profilepic: Profilepic,
            address: address,
            uid:user.uid
          })
          resolve("success");
          // loading.dismiss();
        }).catch((error) => {
          console.log(error.message);
        })
      // })
    
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
      // this.router.navigate(['./rest-home']);
    });

    //this.firebase.auth.signOut().then(()=>{
  
      //this.router.navigate(['/home']);
  }
  CurrentUserKey;
    CurrentUserrLoggedIn() {
      return new Promise((accpt, rejc) => {
          let userID = firebase.auth().currentUser;
          firebase.database().ref("Restaurant-Owner/" + userID.uid).on('value', (data: any) => {
            var details = data.val();
            accpt(details)
          });
      })
  }
  
  
  ResurantList() {
      return new Promise((accpt, rejc) => {
        // this.ngzone.run(() => {
        // this.auth.onAuthStateChanged(function (user) {
          let userID = firebase.auth().currentUser;
          firebase.database().ref("Restaurant").on('value', (data: any) => {
            // this.arr.length = 0
            let details = data.val();
            console.log(details)
            // console.log(data.val());
            let keys1: any = Object.keys(details);
            console.log(keys1)
            for (var i = 0; i < keys1.length; i++){
              let k = keys1[i];
              console.log(k)
               let obj = {
                 Restaurant: details[k].Restaurant,
                //  Profilepic: details[k].Profilepic,
                //  address: details[k].address.city,
                //  addressP:details[k].address.province,
            }
           
            this.resArr.push(obj);
               console.log(this.resArr)
            }
           
          });
          // })
          accpt(this.resArr)
        // })
      })
  } 
  
  AddDish(name, Dishpic, Dishdetails) {
    return new Promise((resolve, reject) => {
          var user = firebase.auth().currentUser
          firebase.database().ref("Dish/" + user.uid).push({
            name: name,
            Dishpic: Dishpic,
            Dishdetails:Dishdetails,
            uid:user.uid
          })
          resolve("success");
          // loading.dismiss();
        }).catch((error) => {
          console.log(error.message);
        })
      // })
    
  }
  
}


