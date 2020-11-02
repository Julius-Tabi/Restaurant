import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { FbserviceService } from 'src/app/services/fbservice.service';
// import {NavController, NavParams} from '@ionic/angular'
@Component({
  selector: 'app-adddish',
  templateUrl: './adddish.page.html',
  styleUrls: ['./adddish.page.scss'],
})
export class AdddishPage implements OnInit {
  downloadurl: null;
  CurrentPerson = new Array();
  currentUSerKey
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService, private router: Router) {
    this.fbservice.CurrentUserrLoggedIn().then((data:any) => {
      this.currentUSerKey = data.uid
      console.log(this.currentUSerKey)
    })
  }
   get name() {
    return this.AddDishForm.get("name");
  }
  get Dishpic() {
    return this.AddDishForm.get('Dishpic');
  }
 
   get Dishdetails() {
    return this.AddDishForm.get('Dishdetails');
   }
  
    public errorMessages = {
    name: [
      { type: 'required', message: 'Dish Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
  
    Dishpic: [
      { type: 'required', message: 'Dish details is required' },
      
    ],
    Dishdetails: [
      { type: 'required', message: 'Dish details is required' },
      
    ],
   
    };
  
   AddDishForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    Dishpic: [
      '',
      [
        Validators.required
       
      ]
    ],
    Dishdetails: [
      '',
      [
        Validators.required
        
      ]
    ],
    
  });
  addPic(event: any) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.downloadurl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);

  }
  ngOnInit() {
   
  }
  submit() {
    console.log(this.AddDishForm.value);
    this.fbservice.AddDish(this.AddDishForm.value.name,this.AddDishForm.value.Dishpic,this.AddDishForm.value.Dishdetails).then( data=>{
      console.log(data)
    })
  }
}
