import { Component, OnInit } from '@angular/core';
import{FbserviceService} from '../../services/fbservice.service';
import {AuthPage} from '../service/auth/auth.page'
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {

  constructor(private fbservice: FbserviceService,private router: Router,public nav: NavController,
    public loadingCtrl: LoadingController,private alertCtrl: AlertController, public route: ActivatedRoute) { 
    this.fbservice.getUid();
  }

  ngOnInit() {
  }

}
