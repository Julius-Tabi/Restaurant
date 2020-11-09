import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import{FbserviceService} from '../../services/fbservice.service';
@Component({
  selector: 'app-restreg',
  templateUrl: './restreg.page.html',
  styleUrls: ['./restreg.page.scss'],
})
export class RestregPage implements OnInit {
  CurrentPerson = new Array();
  currentUSerKey;
  downloadurl: null;
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService,private router: Router) {
    this.fbservice.CurrentUserrLoggedIn().then((data:any) => {
      this.currentUSerKey = data.uid
      console.log(this.currentUSerKey)
    })
   }
  showpassword = false;
  passwordToggleIcon = 'eye';
   togglePassword() {
    this.showpassword = !this.showpassword;
  }
  ngOnInit() {
  }
  // RestregistrationForm = this.formBuilder.group({
  //   Restaurant: [''],
  //   email: [''],
  //   phone: [''],
  //   address: this.formBuilder.group({
  //     street: [''],
  //     city: [''],
  //     province: [''],
  //     zip: ['']
  //   })
  // });

  get Restaurant() {
    return this.RestregistrationForm.get("Restaurant");
  }
  get Profilepic() {
    return this.RestregistrationForm.get('Profilepic');
  }
  get street() {
    return this.RestregistrationForm.get('address.street');
  }
  get city() {
    return this.RestregistrationForm.get('address.city');
  }
  get province() {
    return this.RestregistrationForm.get('address.province');
  }
  get zip() {
    return this.RestregistrationForm.get('address.zip');
  }
 
  public errorMessages = {
    Restaurant: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    Profilepic: [
      { type: 'required', message: 'Profile picture is required' },
      
    ],
   
    street: [
      { type: 'required', message: 'Street name is required' },
      {
        type: 'maxlength',
        message: 'Street name cant be longer than 100 characters'
      }
    ],
    city: [
      { type: 'required', message: 'City name is required' },
      {
        type: 'maxlength',
        message: 'City name cant be longer than 100 characters'
      }
    ],
    province: [
      { type: 'required', message: 'Province is required' },
      {
        type: 'maxlength',
        message: 'Province cant be longer than 100 characters'
      }
    ],
    zip: [
      { type: 'required', message: 'Zip code is required' },
      {
        type: 'pattern',
        message: 'Please enter a valid zip code'
      }
    ]
  };
  RestregistrationForm = this.formBuilder.group({
    Restaurant: ['', [Validators.required, Validators.maxLength(100)]],
    Profilepic: [
      '',
      [
        Validators.required
       
      ]
    ],
    address: this.formBuilder.group({
      street: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      province: ['', [Validators.required, Validators.maxLength(100)]],
      zip: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]
      ]
    })
  });
  addPic(event: any) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.downloadurl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);

  }
 
  

  submit() {
    console.log(this.RestregistrationForm.value);
    this.fbservice.AddResturant(this.RestregistrationForm.value.Restaurant, this.RestregistrationForm.value.Profilepic,this.RestregistrationForm.value.address).then( data=>{
      console.log(data)
      this.router.navigate(['/rest-home']);
    })
  //    this.fbservice.RestSignup(this.RestregistrationForm.value.Restaurant,this.RestregistrationForm.value.email,this.RestregistrationForm.value.phone,this.RestregistrationForm.value.password,this.RestregistrationForm.value.Confirmpassword,this.RestregistrationForm.value.address).then(() => {
  //     console.log("check ur emails")
  //     this.router.navigate(['/restlogin']);
  // }, (error) => {
  //   console.log(error);
  // })
  }
  signout(){
    this.fbservice.logout();
    console.log("signed out");
    this.router.navigate(['/restlogin']);
  }
}
  

