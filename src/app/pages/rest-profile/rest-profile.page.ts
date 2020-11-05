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
  CurrentPerson = new Array();
  currentUSerKey;
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService,private router: Router) {
    this.fbservice.CurrentUserrLoggedIn().then((data:any) => {
      this.currentUSerKey = data.uid
      console.log(this.currentUSerKey)
      this.getResurants();
    })
   }
   getResurants() {
    this.fbservice.ResurantProfile().then((data:any) => {
    this.displayResurantList = data
    console.log(this.displayResurantList)
    
  })
}
  ngOnInit() {
  }

}
