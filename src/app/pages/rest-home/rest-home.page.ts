import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{FbserviceService} from '../../services/fbservice.service';
@Component({
  selector: 'app-rest-home',
  templateUrl: './rest-home.page.html',
  styleUrls: ['./rest-home.page.scss'],
})
export class RestHomePage implements OnInit {
  CurrentPerson = new Array();
  constructor(private router: Router, private fbservice: FbserviceService) {
    this.fbservice.CurrentUserrLoggedIn().then(data => {
      // console.log(this.uid)
      this.CurrentPerson.push(data)
        console.log(this.CurrentPerson)
    })
  }

  ngOnInit() {
  }
  Logout(){
  this.fbservice.logout();
  }
}
