import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import{FbserviceService} from '../../services/fbservice.service';
@Component({
  selector: 'app-view-rest',
  templateUrl: './view-rest.page.html',
  styleUrls: ['./view-rest.page.scss'],
})
export class ViewRestPage implements OnInit {
  id:any
  displayResurantProfile = [];
  constructor( private fbservice: FbserviceService,private router: Router, public route: ActivatedRoute) { 
    this.viewProfile();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    // this.id = this.route.snapshot.params.id
  }
  viewProfile() {
    this.fbservice.ResurantProfile().then((data:any) => {
    this.displayResurantProfile = data
    console.log(this.displayResurantProfile)
  })
}
//   getResurants() {
//     this.fbservice.ResurantList().then((data:any) => {
//     this.displayResurantList = data.uid
//     console.log(this.displayResurantList)
//   })
// }
  
}
