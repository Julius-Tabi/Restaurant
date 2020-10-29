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

  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService,private router: Router) { }

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
  get email() {
    return this.RestregistrationForm.get("email");
  }
  get phone() {
    return this.RestregistrationForm.get('phone');
  }
  get password() {
    return this.RestregistrationForm.get('password');
  }
   get Confirmpassword() {
    return this.RestregistrationForm.get('Confirmpassword');
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
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    phone: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'pattern', message: 'Please enter a valid phone number' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Please enter a valid Password' }
    ],
     Confirmpassword: [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Please enter a valid Password' }
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
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    phone: [
      '',
      [
        Validators.required, Validators.maxLength(10), Validators.minLength(10),
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
      ]
    ],
    password: [
      '',
      [
        Validators.required
        
      ]
    ],
    Confirmpassword: [
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

  submit() {
    console.log(this.RestregistrationForm.value);
     this.fbservice.RestSignup(this.RestregistrationForm.value.Restaurant,this.RestregistrationForm.value.email,this.RestregistrationForm.value.phone,this.RestregistrationForm.value.password,this.RestregistrationForm.value.Confirmpassword,this.RestregistrationForm.value.address).then(() => {
      console.log("check ur emails")
      this.router.navigate(['/restlogin']);
  }, (error) => {
    console.log(error);
  })
  }
}
