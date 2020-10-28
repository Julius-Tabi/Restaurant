import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
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
  
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService) {}
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
  public submit() {
    console.log(this.RegForm.value);
  }

  // this.fbservice.Signup(email,password,name).then(() => {
  //   const alert = this.alertCtrl.create({
  //     // title: "No Name",
  //     subTitle: "We have sent you a link on your email ,Please verify your email",
  //     cssClass : 'myAlert',
  //     buttons: [
  //       {
  //         text: 'Ok',
  //         handler: () => {
  //        this.navCtrl.pop()
  //         }
  //       },
  //     ]
  //   });
  //   alert.present();

  // }, (error) => {
  //   console.log(error.message);
  // })
  
}

