import { Component, OnInit } from '@angular/core';
import {map, take} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
// import {AngularFireAuth} from '@angular/fire/auth'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
isloggedIn = false
constructor() { }




  logout(){
    
  }

  ngOnInit() {
  }

}
