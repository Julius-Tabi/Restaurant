import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { FbserviceService } from '../../services/fbservice.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
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
  
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService,private router: Router,public nav: NavController,
    public loadingCtrl: LoadingController,private alertCtrl: AlertController) {}
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
  // submit() {
    
     
  //   console.log(this.RegForm.value);
  //    this.fbservice.Signup(this.RegForm.value.name,this.RegForm.value.email).then((newUser) => {
  //      console.log("check ur emails")
  //      return firebase.firestore().collection('Users').doc(newUser.user.uid).set({
  //       name: this.RegForm.value.name
  //       // phone: phone
           
  //       // downloadurl: "../../assets/imgs/Defaults/default.jpg",
  //       // address: "",
  //     })
  //        .then(() => {
  //          console.log(newUser.user)
  //          this.router.navigate(['/home']);
  //        })
       
  //     // this.router.navigate(['/home']);
  // }, (error) => {
  //   console.log(error);
  // })
    async submit() {
    const alert = await this.alertCtrl.create({
      message: `Your account is registered successfully, click Okay to continue to login.`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log(this.RegForm.value);
            // this.isSubmitted = true;
            if(this.RegForm.valid){
              this.fbservice.Signup(this.RegForm.value.email, this.RegForm.value.password).then((res) => {
                return firebase.firestore().collection('Users').doc(res.user.uid).set({
                  name: this.RegForm.value.name,
                  phone: this.RegForm.value.phone
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

 
  
}

