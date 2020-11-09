import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FbserviceService } from '../../services/fbservice.service';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-restlogin',
  templateUrl: './restlogin.page.html',
  styleUrls: ['./restlogin.page.scss'],
})
export class RestloginPage implements OnInit {
  showpassword = false;
  passwordToggleIcon = 'eye';
   togglePassword() {
    this.showpassword = !this.showpassword;
  }
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService,private router: Router,public nav: NavController,
    public loadingCtrl: LoadingController,private alertCtrl: AlertController) { }
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
    
  });
  async submit() {
    const loading = await this.loadingCtrl.create();
    this.fbservice.signAuth();
    console.log(this.LoginForm.value);
    this.fbservice.SignInOwner(this.LoginForm.value.email, this.LoginForm.value.password).then((res) => {
      console.log(res.user);
    }).then(() => {
      loading.dismiss().then(() => {
        this.router.navigateByUrl('/rest-home');
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
  // submit() {
  //   this.fbservice.SignIn(this.LoginForm.value.email, this.LoginForm.value.password).then((user: any) => {
  //     console.log(user);
  //     this.fbservice.checkVerification().then((data: any) => {
  //       if (data == 0) {
  //         console.log("Please verify before you can login")
  
  //       }
  //       else if (data == 1) {
  //         this.router.navigate(['/rest-home']);
  //       }
  //     })
  //   }).catch((error) => {
  //     console.log(error.message)

  //   })
  // }

  ngOnInit() {
  }

}
