import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import{FbserviceService} from '../../services/fbservice.service';
@Component({
  selector: 'app-rest-profile',
  templateUrl: './rest-profile.page.html',
  styleUrls: ['./rest-profile.page.scss'],
})
export class RestProfilePage implements OnInit {

  constructor(private formBuilder: FormBuilder, private fbservice: FbserviceService,private router: Router) { }

  ngOnInit() {
  }
  get Restaurant() {
    return this.RestregistrationForm.get("Restaurant");
  }
  get Profilepic() {
    return this.RestregistrationForm.get('Profilepic');
  }
  get street() {
    return this.RestregistrationForm.get('address.street');
  }
  get city() {
    return this.RestregistrationForm.get('address.city');
  }
  get province() {
    return this.RestregistrationForm.get('address.province');
  }
  get zip() {
    return this.RestregistrationForm.get('address.zip');
  }

  public errorMessages = {
    Restaurant: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
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

  RestregistrationForm = this.formBuilder.group({
    Restaurant: ['', [Validators.required, Validators.maxLength(100)]],
    Profilepic: [
      '',
      [
        Validators.required
       
      ]
    ],
    address: this.formBuilder.group({
      street: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      province: ['', [Validators.required, Validators.maxLength(100)]],
      zip: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]
      ]
    })
  });
}
