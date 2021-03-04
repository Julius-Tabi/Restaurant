import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import{FbserviceService} from '../../services/fbservice.service';
import { Router } from '@angular/router';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/firestore';
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
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService,private router: Router,public nav: NavController,
    public loadingCtrl: LoadingController,private alertCtrl: AlertController) { }
    get name() {
    return this.RestOwnerForm.get('name');
  }

  get email() {
    return this.RestOwnerForm.get("email");
  }
  get password() {
    return this.RestOwnerForm.get('password');
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
  };

  RestOwnerForm = this.formBuilder.group({
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
  
  });
  ngOnInit() {
  }
   async submit() {
    const alert = await this.alertCtrl.create({
      message: `Your account is registered successfully, click Okay to continue to login.`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log(this.RestOwnerForm.value);
            // this.isSubmitted = true;
            if(this.RestOwnerForm.valid){
              this.fbservice.Signup_Owner(this.RestOwnerForm.value.email, this.RestOwnerForm.value.password).then((res) => {
                return firebase.firestore().collection('Restaurant_Owner').doc(res.user.uid).set({
                  name: this.RestOwnerForm.value.name,
                  email: this.RestOwnerForm.value.email,
                  ownerid: res.user.uid,
                  uid: res.user.uid,
                  usergroup: "owner"
                
                //   this.buserSession(ownerId),
                //  this.fb
                  // phone: this.RestOwnerForm.value.phone
                }).then(() => {
                  console.log(res.user);
                  this.router.navigate(['/home']);
                }).catch(function (error) {
                  console.log(error);
                });
              })
            }
          }
        },
      ]
    });
    return await alert.present();
  }
  // submit() {
  //   console.log(this.RestOwnerForm.value);
  //    this.fbservice.RestOwnerSignup(this.RestOwnerForm.value.email,this.RestOwnerForm.value.password).then(() => {
  //     console.log("check ur emails")
  //     this.router.navigate(['/restlogin']);
  // }, (error) => {
  //   console.log(error);
  // })
  // }
}
