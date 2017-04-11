import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
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
  
  loading: Loading;
  registerCredentials = {email: '', password: ''};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private auth: AuthService, 
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController) { }
  
  public createAccount() {
    this.navCtrl.push(Register);
  }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials)
      .subscribe(allowed => {
        if (allowed) {
           setTimeout(() => {
             this.loading.dismiss();
             this.navCtrl.setRoot(HomePage);
          });
        } else {
          this.showError('Invalid Credentials');
        }
      },
      error => {
        this.showError(error);
      })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
