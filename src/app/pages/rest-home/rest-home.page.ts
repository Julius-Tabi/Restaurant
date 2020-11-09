import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{FbserviceService} from '../../services/fbservice.service';
import {AuthPage} from '../service/auth/auth.page'
@Component({
  selector: 'app-rest-home',
  templateUrl: './rest-home.page.html',
  styleUrls: ['./rest-home.page.scss'],
})
export class RestHomePage implements OnInit {
  CurrentPerson = new Array();
  
  constructor(private router: Router, private AuthPage: FbserviceService) {
    // this.fbservice.CurrentUserrLoggedIn().then((data:any) => {
    //   // console.log(this.uid)
    //   this.CurrentPerson = data
    //     console.log(this.CurrentPerson)
    // })
  }

  ngOnInit() {
   
  }
  Logout(){
  
  }
}
