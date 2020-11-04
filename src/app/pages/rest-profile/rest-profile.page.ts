import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import{FbserviceService} from '../../services/fbservice.service';
@Component({
  selector: 'app-rest-profile',
  templateUrl: './rest-profile.page.html',
  styleUrls: ['./rest-profile.page.scss'],
})
export class RestProfilePage implements OnInit {
  displayResurantList = [];
  constructor( private fbservice: FbserviceService,private router: Router) {
    this.getResurants();
   }
   getResurants() {
    this.fbservice.ResurantList().then((data:any) => {
    this.displayResurantList = data
    console.log(this.displayResurantList)
    
  })
}
  ngOnInit() {
  }

}
