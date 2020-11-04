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
          let userID = firebase.auth().currentUser;
          firebase.database().ref("Restaurant/" + userID.uid).on('value', (data: any) => {
            // consolethis first,remember always addd.val()
            // console.log(data.val())
            let resturantuserID = data.val()
            // this shows all keys (with all resturant owners as u saw on console,now you must get inside the user.uid keys)
            let keys1: any = Object.keys(resturantuserID);
            console.log(keys1)
            // you will put everything inside an for loop since they are indexed
            for(var x =0; x < keys1.length;x++){
              
              var k = keys1[x]
              // this part im sure u know 
              console.log(k)
              // you will call the method again using the keys1 you got which is the user.uid key 
              // so you can access the second key as you saw on console

              firebase.database().ref("Restaurant/" + k).on('value', (data2: any) => {
                // console.log(data2.val())
                let resturantuserID2 = data2.val()
                console.log(resturantuserID2)
                let keys2: any = Object.keys(resturantuserID2);
                console.log(keys2)

                // now you must go inside the second key which is your object 
                // you will alwys use for loop since its more than one 
             for(var p = 0;p <keys2.length;p++){
               let k2 = keys2[p]
                  let obj = {
                    Restaurant: resturantuserID2[k2].Restaurant,
                    Profilepic: resturantuserID2[k2].Profilepic,
                    address: resturantuserID2[k2].address.city,
                    addressP:resturantuserID2[k2].address.province,
                    addressZ:resturantuserID2[k2].address.zip,
              }
                  this.resArr.push(obj);
                 console.log(this.resArr)
             }
            
              })
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


