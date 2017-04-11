import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Register } from '../register/register';
import { HomePage } from '../home/home';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private auth: AuthService, 
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController) { }
  
  public createAccount() {
    this.navCtrl.push(Register);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
