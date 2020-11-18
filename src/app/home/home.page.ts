import { Component,OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import {NavController, NavParams,AlertController} from '@ionic/angular'
import{FbserviceService} from '../services/fbservice.service';
import { AuthPage } from '../../app/pages/service/auth/auth.page'
import { AlertController, NavController, LoadingController } from '@ionic/angular';
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
  
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService, private router: Router, public nav: NavController,
    public loadingCtrl: LoadingController, private alertCtrl: AlertController) { }
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
  async submit() {
    const loading = await this.loadingCtrl.create();
    this.fbservice.signAuth();
    console.log(this.LoginForm.value);
    this.fbservice.SignIn(this.LoginForm.value.email, this.LoginForm.value.password).then((res) => {
      console.log(res.user);
    }).then(() => {
      loading.dismiss().then(() => {
        this.router.navigateByUrl('/user-home');
      });
    },
      error => {
        loading.dismiss().then(() => {
          console.log(error);
        });
      }
    );
    return await loading.present();
  }
}
