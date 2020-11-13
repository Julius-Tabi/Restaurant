import { Component, OnInit } from '@angular/core';
// import { FormGroup } from '@angular/forms';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { FbserviceService } from '../../services/fbservice.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-reserve-table',
  templateUrl: './reserve-table.page.html',
  styleUrls: ['./reserve-table.page.scss'],
})
export class ReserveTablePage implements OnInit {
  ReservationForm: FormGroup;
  uid = this.route.snapshot.params.id;
  id: any;
  ownerId: any
  userId: any;
  array: any = []

  resName: any;
  resResult: any;

  // isSubmitted: boolean = false;
  spin: boolean = false;
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService, private router: Router, public nav: NavController,
    public loadingCtrl: LoadingController, private alertCtrl: AlertController,private route: ActivatedRoute,) { }

  ngOnInit() {
    this.fbservice.signAuth();

    this.id = this.route.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)
    //console.log(this.uid)
    this.addRest();
  }
  get name() {
    return this.ReservationForm.get("name");
  }
  get NoOfpeople() {
    return this.ReservationForm.get('NoOfpeople');
  }
  get date() {
    return this.ReservationForm.get('date');
  }
  get time() {
    return this.ReservationForm.get('time');
  }
  get email() {
    return this.ReservationForm.get('email');
  }
  get phone() {
    return this.ReservationForm.get('phone');
  }
  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    NoOfpeople: [
      { type: 'required', message: 'No Of people is required' },
      
    ],
   
    date: [
      { type: 'required', message: 'date is required' },
      {
        type: 'maxlength',
        message: 'Date cant be longer than 100 characters'
      }
    ],
    time: [
      { type: 'required', message: 'time  is required' },
      {
        type: 'maxlength',
        message: 'time cant be longer than 100 characters'
      }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    phone: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'pattern', message: 'Please enter a valid phone number' }
    ],
  };
  addRest() {
  this.ReservationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    NoOfpeople: [
      '',
      [
        Validators.required
       
      ]
    ],
    date: ['', [Validators.required, Validators.maxLength(100)]],
    time: ['', [Validators.required, Validators.maxLength(100)]],
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
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
      ]
    ],
    
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

  async submit() {

    const alert = await this.alertCtrl.create({

      message: `Thank you for making a booking with us, please click Okay to confirm.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: ', blah);
          },
        },
        {
          text: 'Okay',
          handler: () => {

            var user = firebase.auth().currentUser;
            this.userId = user.uid;
            console.log('userId booking: ', this.userId);
            this.ownerId = this.uid;
            console.log('Owner ID booking: ', this.ownerId)
            console.log('ID booking: ', this.id)

            // this.isSubmitted = true;
            // if(this.bookingForm.valid){
              this.fbservice.reserve().doc(this.id).collection('bookings').add({
                userId: this.userId,
                ownerId: this.uid,
                name: this.ReservationForm.value.name,
                NoOfpeople: this.ReservationForm.value.NoOfpeople,
                date: this.ReservationForm.value.date,
                time: this.ReservationForm.value.time,
                phone: this.ReservationForm.value.phone,
                email: this.ReservationForm.value.email,
                status: 'pending'
                
              }).then(() => {
                this.router.navigateByUrl('/browse-menu/' + this.ownerId);
                this.ReservationForm.reset();
              }).catch(function (error) {
                console.log(error)
              })
            // }else{
            //   console.log('Invalid fields')
            // }
          },
        },
      ],
    });
    return await alert.present();
  }
  disableData() {
  
    var today = new Date().toISOString().split('T')[0]; 
    document.getElementsByName("CheckIndate")[0].setAttribute('min', today); 
    // console.log(today);
  
  }
}
