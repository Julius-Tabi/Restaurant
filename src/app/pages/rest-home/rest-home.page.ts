import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{FbserviceService} from '../../services/fbservice.service';
@Component({
  selector: 'app-rest-home',
  templateUrl: './rest-home.page.html',
  styleUrls: ['./rest-home.page.scss'],
})
export class RestHomePage implements OnInit {

  constructor(private router: Router,private fbservice: FbserviceService) { }

  ngOnInit() {
  }
  Logout(){
  this.fbservice.logout();
  }
}
