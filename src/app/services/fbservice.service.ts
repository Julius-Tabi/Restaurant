import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
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
  resProfArray = new Array()
  UID:any;
  constructor(private router:Router) {
      
   }
signAuth(){
    return firebase.auth().onAuthStateChanged(user => {
     if(user){
      const uid = user.uid;
      //  this.setSession(email);
      this.setuid(uid)
      console.log('user logged in: ', user);
     }else{
       console.log('user logged out')
     }
    });
  }
  
  
  setuid(a){
    this.UID = a;
  }
  getUid(){
    return this.UID;
  }
  // registration 
  Signup(email,password) {
    // return new Promise((resolve, reject) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .then((newUser) => {
    //       console.log(newUser)
    //       // var user = firebase.auth().currentUser
    //     // firebase.firestore().collection('Users').doc(newUser.user.uid).set({
    //     //     name: name,
    //     //     phone:phone
           
    //     //     // downloadurl: "../../assets/imgs/Defaults/default.jpg",
    //     //     // address: "",
    //     //   });
    //       var user = firebase.auth().currentUser;
    //       user.sendEmailVerification().then(function () {
    //         // Email sent.
    //       }).catch(function (error) {
    //         // An error happened.
    //       });
    //       resolve();
    //       // loading.dismiss();
    //     }).catch((error) => {
    //       console.log(error);
    //     })
    //   // })
    // })
  }
   Signup_Owner(email,password) {
    // return new Promise((resolve, reject) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .then((newUser) => {
    //       console.log(newUser)
    //       // var user = firebase.auth().currentUser
    //     // firebase.firestore().collection('Users').doc(newUser.user.uid).set({
    //     //     name: name,
    //     //     phone:phone
           
    //     //     // downloadurl: "../../assets/imgs/Defaults/default.jpg",
    //     //     // address: "",
    //     //   });
    //       var user = firebase.auth().currentUser;
    //       user.sendEmailVerification().then(function () {
    //         // Email sent.
    //       }).catch(function (error) {
    //         // An error happened.
    //       });
    //       resolve();
    //       // loading.dismiss();
    //     }).catch((error) => {
    //       console.log(error);
    //     })
    //   // })
    // })
  }
  
   SignIn(email, password) {
    // return new Promise((resolve, reject) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    //    .then(() => {
    //       resolve();
    //     }).catch((error) => {
    //       console.log(error.message)
    //   })
    // })

  }
  SignInOwner(email, password) {
    // return new Promise((resolve, reject) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    //    .then(() => {
    //       resolve();
    //     }).catch((error) => {
    //       console.log(error.message)
    //   })
    // })

  }
  
   regRest() {
    return firebase.firestore().collection('restaurants');
  }
  
  reserve() {
    return firebase.firestore().collection('restaurants');
  }
  bookingStatus(ownerId, userId, value){
    var db = firebase.firestore();
    var restaurantRef = db.collection('restaurants').doc(ownerId);
    var restaurant = Promise.all([
      restaurantRef.collection('bookings').doc(userId).set({
        status: value
      }, { merge: true }).then(a => {
        console.log('Changed: ', a)
      })
    ])
  }
  // bookingStatus(ownerId, userId, value){
  //   var db = firebase.firestore();
  //   var restaurantRef = db.collection('restaurants').doc(ownerId);
  //   var restaurant = Promise.all([
  //     restaurantRef.collection('bookings').doc(userId).set({
  //       status: value
        
  //     }, { merge: true }).then(a => {
  //       console.log('Changed')
  //     })
  //   ])
  // }
  
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
        let userID = firebase.auth().currentUser.uid;
        firebase.database().ref("Restaurant-Owner/" + userID).on('value', (data: any) => {
          var details = data.val();
          accpt(details)
        });
    })
}
  
  // ResurantList() {
  //     return new Promise((accpt, rejc) => {
  //         // let userID = firebase.auth().currentUser;
  //         firebase.database().ref("Restaurant/").on('value', (data: any) => {
  //           // console this first,remember always add .val()
  //           // console.log(data.val())
  //           let resturantuserID = data.val()
  //           // this shows all keys (with all resturant owners as u saw on console,now i must get inside the user.uid keys)
  //           let keys1: any = Object.keys(resturantuserID);
  //           console.log(keys1)
  //           // i will put everything inside an for loop since they are indexed
  //           for(var x =0; x < keys1.length;x++){
              
  //             var k = keys1[x]
          
  //             console.log(k)
  //             // i will call the method again using the keys1 you got which is the user.uid key 
  //             // so you can access the second key as you saw on console

  //             firebase.database().ref("Restaurant/" + k).on('value', (data2: any) => {
  //               // console.log(data2.val())
  //               let resturantuserID2 = data2.val()
  //               console.log(resturantuserID2)
  //               let keys2: any = Object.keys(resturantuserID2);
  //               console.log(keys2)

  //               // now i must go inside the second key which is your object 
  //               // i will alwys use for loop since its more than one 
  //            for(var p = 0;p <keys2.length;p++){
  //              let k2 = keys2[p]
  //                 let obj = {
  //                   Restaurant: resturantuserID2[k2].Restaurant,
  //                   Profilepic: resturantuserID2[k2].Profilepic,
  //                   addressS: resturantuserID2[k2].address.street,
  //                   address: resturantuserID2[k2].address.city,
  //                   addressP:resturantuserID2[k2].address.province,
  //                   addressZ:resturantuserID2[k2].address.zip,
  //                   uid:resturantuserID2[k2].uid
  //             }
  //                 this.resArr.push(obj);
  //                console.log(this.resArr)
  //            }
  //             })
  //           }        
  //         });
  //         // })
  //         accpt(this.resArr)
  //       // })
  //     })
  // } 

  ResurantProfile() {
    return new Promise((accpt, rejc) => {
        let userID = firebase.auth().currentUser.uid;
        firebase.database().ref("Restaurant/" + userID).once('value', (data: any) => {
          let resturantuserID = data.val()
          console.log(resturantuserID);
          // this shows all keys (with all resturant owners as u saw on console,now i must get inside the user.uid keys)
          let keys1: any = Object.keys(resturantuserID);
          console.log(keys1)
          // i will put everything inside an for loop since they are indexed
          for(var x =0; x < keys1.length;x++){
            var k = keys1[x]
             
            console.log(k)
            let obj = {
               Profilepic: resturantuserID[k].Profilepic,
              Restaurant: resturantuserID[k].Restaurant,
               address: resturantuserID[k].address.city,
                addressP:resturantuserID[k].address.province,
                addressZ:resturantuserID[k].address.zip,
                uid:resturantuserID[k].uid
            }
            console.log(obj)
                 this.resProfArray.push(obj);
               console.log(this.resProfArray)
          }        
        accpt(this.resProfArray)
      })
    })
} 

viewProfile() {
  return new Promise((accpt, rejc) => {
      // let userID = firebase.auth().currentUser.uid;
      firebase.database().ref("Restaurant").once('value', (data: any) => {
        let resturantuserID = data.val()
        console.log(resturantuserID);
        // this shows all keys (with all resturant owners as u saw on console,now i must get inside the user.uid keys)
        let keys1: any = Object.keys(resturantuserID);
        console.log(keys1)
        // i will put everything inside an for loop since they are indexed
        for(var x =0; x < keys1.length;x++){
          var k = keys1[x]
           
          console.log(k)
          let obj = {
             Profilepic: resturantuserID[k].Profilepic,
            Restaurant: resturantuserID[k].Restaurant,
             address: resturantuserID[k].address.city,
              addressP:resturantuserID[k].address.province,
              addressZ:resturantuserID[k].address.zip,
              uid:resturantuserID[k].uid
              // uid:resturantuserID
          }
          console.log(obj)
               this.resProfArray.push(obj);
             console.log(this.resProfArray)
        }        
      accpt(this.resProfArray)
    })
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
  UpdateDish(name, Dishpic, Dishdetails) {
    return new Promise((resolve, reject) => {
          var user = firebase.auth().currentUser
          firebase.database().ref("Dish/" + user.uid).set({
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




