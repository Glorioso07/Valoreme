import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-success',
  templateUrl: 'success.html'
})
export class VotationSuccessPage {

  constructor(public navCtrl: NavController) {
  	setTimeout(() => {
  		this.navCtrl.remove(2,2);
    }, 2000);
  }
  
}