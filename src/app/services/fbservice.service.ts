import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { AlertController,LoadingController } from '@ionic/angular';

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
  UID: any;
  uid: any;
  status: boolean;
  db = firebase.firestore();
  ownerId: any;
  constructor(private router:Router,public route: ActivatedRoute, public aletCtrl: AlertController,public loadiCtrl: LoadingController) {
      
   }
signAuth(){
    return firebase.auth().onAuthStateChanged(user => {
     if(user){
      const uid = user.uid;
      //  this.setSession(email);
      this.setuid(uid)
       console.log('user logged in: ', user);
      //  console.log('the user has no Account on this side of the app')
     }else{
       console.log('user logged out');
       
      //  this.router.navigateByUrl('/home');
     }
    });
  }
  
  
  setuid(a){
    this.UID = a;
  }
  getUid(){
    return this.UID;
  }
  
  
   userSession(ownerId) {
    this.ownerId = ownerId;
  }

  getUserSession() {
    return this.ownerId;
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
    // //         // Email sent.
    //       }).catch(function (error) {
    // //         // An error happened.
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
          console.log('you did not verify your email');
          resolve(0)
        }
        else {
          resolve(1)
        }
      })
    })
  }

  checkExistance(uid) {
    this.db.collectionGroup("Restaurant_Owner")
      .where("uid", "==", (uid))
      .get()
      .then(snap => {
        snap.forEach(doc => {
          if (!doc.exists) {
            console.log("No such user in the profiles Document!");
          
          } 
        if(doc.exists)
            if (doc.data().usergroup == 'owner') {
              console.log("Owner")
              this.status = true;            
              console.log("Document data:", doc.data());
              console.log("Yeess! looks like you have a business account profile with us");
              this.showAlertError();
              // this.checkVerification();
              // this.router.navigateByUrl('/rest-home');
            } 
              else  {
                console.log("User")
                this.status = false;
              }
          
        });
        if (this.status != true) {
          console.log("User");
          console.log("Oops! looks like you don't have a business account profile with us");
                // this.showAlertError();
                // this.router.navigateByUrl('/signup'); 
        }
        
      }).catch((error) => {
         console.log(error.message);
       });
  }
  
   checkUserExistance(uid) {
     this.db.collection("Users")
       .where("uid", "==", (uid))
       .get()
       .then(snap => {
         snap.forEach(doc => {
           if (!doc.exists) {
             console.log("No such user in the profiles Document!");
             this.router.navigateByUrl('/user-reg');
           } else {
             if (doc.data().usergroup == 'user') {
               console.log("User")
               this.status = true;
               console.log("Document data:", doc.data());
               console.log("Yeess! looks like you have a User account profile with us");
               
               this.showAlertErrorUser();
              //  this.router.navigateByUrl('/user-home');
             }
             else {
               console.log("Owner")
               this.status = false;
             if (this.status == false) {
           console.log("Owner");
           console.log("Oops! looks like you don't have a User account profile with us");
          //  this.showAlertErrorUser();
           // this.router.navigateByUrl('/signup'); 
         }
               // this.router.navigateByUrl('/user-reg');
             }
           
           }
         })
        //  if (this.status != true) {
        //    console.log("Owner");
        //    console.log("Oops! looks like you don't have a User account profile with us");
        //    this.showAlertErrorUser();
        //    // this.router.navigateByUrl('/signup'); 
        //  }
        
       }).catch((error) => {
         console.log(error.message);
       });
  }
  
     async showAlertErrorUser() { 
     
  const alert = await this.aletCtrl.create({ 
    // header: 'Alert!', 
       message: 'Login Successful, Click Okay to Continue',
      buttons: [
        {
          text: 'Okay',
          handler: async () => {
            
           this.router.navigateByUrl('/user-home');
      }
        },
      ]
    }); 
   await alert.present(); 
  }
  
   async showAlertError() { 
     
  const alert = await this.aletCtrl.create({ 
    // header: 'Alert!', 
      message: 'Login Successful, Click Okay to Continue',
      buttons: [
        {
          text: 'Okay',
          handler: async () => {
            
          this.router.navigateByUrl('/rest-home');
      }
        },
      ]
    }); 
   await alert.present(); 
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
          // resolve();
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
          // resolve();
        }).catch((error) => {
          console.log(error.message)
      })
    })

  }

  logout()
  { 
   firebase.auth().signOut().then(function() {
     console.log('Signed Out');
    
}, function(error) {
  console.error('Sign Out Error', error);
   });
    this.router.navigateByUrl('/home');
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




