import { Component,OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NavController, NavParams,AlertController} from '@ionic/angular'
import{FbserviceService} from '../services/fbservice.service';
import {AuthPage} from '../../app/pages/service/auth/auth.page'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  title = 'firebase-angular-auth';
  isSignedIn = false
  showpassword = false;
  passwordToggleIcon = 'eye';
   togglePassword() {
    this.showpassword = !this.showpassword;
  }
  
  constructor(private formBuilder: FormBuilder,private router: Router,private fbservice: FbserviceService,public alertCtrl :AlertController) {}
  ngOnInit(): void {

  }
  get email() {
    return this.LoginForm.get('email');
  }
  get password() {
    return this.LoginForm.get('password');
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
  LoginForm = this.formBuilder.group({
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
  
    
    // address: this.formBuilder.group({
    //   street: ['', [Validators.required, Validators.maxLength(100)]],
    //   city: ['', [Validators.required, Validators.maxLength(100)]],
    //   state: ['', [Validators.required, Validators.maxLength(100)]],
    //   zip: [
    //     '',
    //     [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]
    //   ]
    // })
  });


  // we will find a way on these alerts later lets continue now u must add a dish
  //okay let me do that but i must do the toilet fisrt,don't feel comfy
   submit() {
    this.fbservice.SignIn(this.LoginForm.value.email, this.LoginForm.value.password).then((user: any) => {
      console.log(user);
      this.fbservice.checkVerification().then((data: any) => {
        if (data == 0) {
          //  const alert = this.alertCtrl.create({
          //   // title: "No Password",
          //   title: "We have sent you a verification mail, Please activate your account with the link in the mail",
          //   buttons: ['OK'],
          
          // });
  
        }
        else if (data == 1) {
          this.router.navigate(['/restaurant-list']);
        }
      })
    }).catch((error) => {
    //  const alert = this.alertCtrl.create({
    //     // title: "No Password",
    //     subTitle: error.message,
    //     buttons: ['OK'],
      
    //   });

    })
  }
}
