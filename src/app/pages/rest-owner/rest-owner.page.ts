import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import{FbserviceService} from '../../services/fbservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rest-owner',
  templateUrl: './rest-owner.page.html',
  styleUrls: ['./rest-owner.page.scss'],
})
export class RestOwnerPage implements OnInit {
  showpassword = false;
  passwordToggleIcon = 'eye';
   togglePassword() {
    this.showpassword = !this.showpassword;
   }
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService,private router: Router) { }
  get email() {
    return this.RestOwnerForm.get("email");
  }
  get password() {
    return this.RestOwnerForm.get('password');
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Please enter a valid Password' }
    ],
  };

  RestOwnerForm = this.formBuilder.group({
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
  
  });
  ngOnInit() {
  }
  submit() {
    console.log(this.RestOwnerForm.value);
     this.fbservice.RestOwnerSignup(this.RestOwnerForm.value.email,this.RestOwnerForm.value.password).then(() => {
      console.log("check ur emails")
      this.router.navigate(['/restlogin']);
  }, (error) => {
    console.log(error);
  })
  }
}
