import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators, } from '@angular/forms';
import { Router } from '@angular/router';
// import { FbserviceService } from 'src/app/services/fbservice.service';
import { FbserviceService } from '../../services/fbservice.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-drink',
  templateUrl: './add-drink.page.html',
  styleUrls: ['./add-drink.page.scss'],
})
export class AddDrinkPage implements OnInit {
  downloadurl: null;
  CurrentPerson = new Array();
  currentUSerKey
  AddDishForm: FormGroup
  ownerId: any
  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService, private router: Router, public nav: NavController,
    public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }
  get name() {
    return this.AddDishForm.get("name");
  }
  get Dishpic() {
    return this.AddDishForm.get('Dishpic');
  }
 
  get Dishdetails() {
    return this.AddDishForm.get('Dishdetails');
  }
  get price() {
    return this.AddDishForm.get('price');
  }
  
  public errorMessages = {
    name: [
      { type: 'required', message: 'Dish Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
  
    Dishpic: [
      { type: 'required', message: 'Dish details is required' },
      
    ],
    Dishdetails: [
      { type: 'required', message: 'Dish details is required' },
      
    ],
    price: [
      { type: 'required', message: 'Dish price is required' },
      
    ],
   
  };
  
  AddDish() {
    this.AddDishForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      Dishpic: [
        '',
        [
          Validators.required
       
        ]
      ],
      Dishdetails: [
        '',
        [
          Validators.required
        
        ]
      ],
      price: [
        '',
        [
          Validators.required
        
        ]
      ],
    
    });
  }
  addPic(event: any) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.downloadurl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);

  }
  ngOnInit() {
    this.AddDish()
  }
  async submit() {
    const loading = await this.loadingCtrl.create();
    var user = firebase.auth().currentUser
    this.ownerId = user.uid;
    // Adding new menu
    this.fbservice.reserve().doc(this.ownerId).collection('Drinks').add({
      ownerId: this.ownerId,
      name: this.AddDishForm.value.name,
      Dishpic: this.AddDishForm.value.Dishpic,
      Dishdetails: this.AddDishForm.value.Dishdetails,
      price: this.AddDishForm.value.price,
     
    }).then(() => {
      loading.dismiss().then(() => {
        this.router.navigateByUrl('/rest-home')
        this.AddDishForm.reset();
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
