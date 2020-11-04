import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import{FbserviceService} from '../../services/fbservice.service';
@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.page.html',
  styleUrls: ['./user-reg.page.scss'],
})
export class UserRegPage implements OnInit {

  // constructor() { }

  
  ngOnInit(

  ) {
  }
     showpassword = false;
  passwordToggleIcon = 'eye';
   togglePassword() {
    this.showpassword = !this.showpassword;
  }
  
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService,private router: Router) {}
  get name() {
    return this.RegForm.get("name");
  }
  get email() {
    return this.RegForm.get('email');
  }
  get password() {
    return this.RegForm.get('password');
  }
   get Confirmpassword() {
    return this.RegForm.get('Confirmpassword');
  }
  get phone() {
    return this.RegForm.get('phone');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
  
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Please enter a valid Password' }
    ],
     Confirmpassword: [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Please enter a valid Password' }
    ],
    phone: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'pattern', message: 'Please enter a valid phone number' }
    ],
  };
  RegForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
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
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
      ]
    ],
  });
   submit() {
    console.log(this.RegForm.value);
     this.fbservice.Signup(this.RegForm.value.name,this.RegForm.value.email,this.RegForm.value.phone,this.RegForm.value.password,this.RegForm.value.Confirmpassword).then(() => {
       console.log("check ur emails")
       
       
      this.router.navigate(['/home']);
  }, (error) => {
    console.log(error);
  })
  }

 
  
}

