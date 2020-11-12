import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { FbserviceService } from '../../services/fbservice.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-restreg',
  templateUrl: './restreg.page.html',
  styleUrls: ['./restreg.page.scss'],
})
export class RestregPage implements OnInit {
  CurrentPerson = new Array();
  currentUSerKey;
  downloadurl: null;
  ownerId: any
  RestregistrationForm:FormGroup
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService, private router: Router, public nav: NavController,
    public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    // this.fbservice.CurrentUserrLoggedIn().then((data:any) => {
    //   this.currentUSerKey = data.uid
    //   console.log(this.currentUSerKey)
    // })
  }
  showpassword = false;
  passwordToggleIcon = 'eye';
  togglePassword() {
    this.showpassword = !this.showpassword;
  }
  ngOnInit() {
    this.addRest()
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
    return this.RestregistrationForm.get('street');
  }
  get city() {
    return this.RestregistrationForm.get('city');
  }
  get province() {
    return this.RestregistrationForm.get('province');
  }
  get zip() {
    return this.RestregistrationForm.get('zip');
  }
  get aboutRest() {
    return this.RestregistrationForm.get('aboutRest');
  }
  get Slogan() {
    return this.RestregistrationForm.get('Slogan');
  }
  get date() {
    return this.RestregistrationForm.get('date');
  }
  get NoOfemps() {
    return this.RestregistrationForm.get('NoOfemps');
  }
 
  public errorMessages = {
    Restaurant: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    aboutRest: [
      { type: 'required', message: 'about is required' },
   
    ],
    Slogan: [
      { type: 'required', message: 'slogan is required' },
   
    ],
    NoOfemps: [
      { type: 'required', message: 'Number of employees is required' },
   
    ],
    date: [
      { type: 'required', message: 'date is required' },
    
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
  addRest() {
  this.RestregistrationForm = this.formBuilder.group({
    Restaurant: ['', [Validators.required, Validators.maxLength(100)]],
    aboutRest: ['', [Validators.required]],
    Slogan: ['', [Validators.required, Validators.maxLength(100)]],
    NoOfemps: ['', [Validators.required]],
    date: ['', [Validators.required, Validators.maxLength(100)]],
    Profilepic: [
      '',
      [
        Validators.required
       
      ]
    ],
    street: ['', [Validators.required, Validators.maxLength(100)]],
    city: ['', [Validators.required, Validators.maxLength(100)]],
    province: ['', [Validators.required, Validators.maxLength(100)]],
    zip: [
      '',
      [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]
    ]
    // address: this.formBuilder.group({
    //   street: ['', [Validators.required, Validators.maxLength(100)]],
    //   city: ['', [Validators.required, Validators.maxLength(100)]],
    //   province: ['', [Validators.required, Validators.maxLength(100)]],
    //   zip: [
    //     '',
    //     [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]
    //   ]
    // })
  });
  }
  
  addPic(event: any) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.downloadurl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);

  }
 
  async submit() {
    const alert = await this.alertCtrl.create({
      message: `Restaurant added successfulluy, please click Okay to confirm`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log(this.RestregistrationForm.value);
            var user = firebase.auth().currentUser
            this.ownerId = user.uid;
            this.fbservice.regRest().doc(this.ownerId).set({
              ownerId: this.ownerId,
              Restaurant: this.RestregistrationForm.value.Restaurant,
              aboutRest: this.RestregistrationForm.value.aboutRest,
              Slogan: this.RestregistrationForm.value.Slogan,
              NoOfemps: this.RestregistrationForm.value.NoOfemps,
              date: this.RestregistrationForm.value.date,
              Profilepic: this.RestregistrationForm.value.Profilepic,
              street:this.RestregistrationForm.value.street,
              city:this.RestregistrationForm.value.city,
              province:this.RestregistrationForm.value.province,
              zip:this.RestregistrationForm.value.zip,
              // address: this.RestregistrationForm.value.address
            }).then(() => {
              this.router.navigateByUrl('/rest-home');
              this.RestregistrationForm.reset();
            }).catch(function (error) {
              console.log(error)
            });
          },
        },
      ]
    });
    return await alert.present();

    // submit() {
    //   console.log(this.RestregistrationForm.value);
    //   this.fbservice.AddResturant(this.RestregistrationForm.value.Restaurant, this.RestregistrationForm.value.Profilepic,this.RestregistrationForm.value.address).then( data=>{
    //     console.log(data)
    //     this.router.navigate(['/rest-home']);
    //   })
    // //    this.fbservice.RestSignup(this.RestregistrationForm.value.Restaurant,this.RestregistrationForm.value.email,this.RestregistrationForm.value.phone,this.RestregistrationForm.value.password,this.RestregistrationForm.value.Confirmpassword,this.RestregistrationForm.value.address).then(() => {
    // //     console.log("check ur emails")
    // //     this.router.navigate(['/restlogin']);
    // // }, (error) => {
    // //   console.log(error);
    // // })
    // }
    // signout(){
    //   this.fbservice.logout();
    //   console.log("signed out");
    //   this.router.navigate(['/restlogin']);
    // }
  }
}
  

