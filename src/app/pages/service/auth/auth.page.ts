import { Component, OnInit } from '@angular/core';
import {map, take} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
isloggedIn = false
constructor(public firebaseAuth: AngularFireAuth) { }
async signin(email: string, password: string){
await this.firebaseAuth.signInWithEmailAndPassword(email,password)
.then(res=>{
  this.isloggedIn=true
  localStorage.setItem('user',JSON.stringify(res.user))
})
}

async signup(email: string, password: string){
  await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
  .then(res=>{
    this.isloggedIn=true
    localStorage.setItem('user',JSON.stringify(res.user))
  })
  }

  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }

  ngOnInit() {
  }

}
