import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Constants } from '../../utils/constants';
import { VotationPage } from '../votation/votation';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'page-waiters',
  templateUrl: 'waiters.html'
})
export class WaitersPage {

	loading: any = null;
	hasResponse: boolean = false;
	waiters: any = null;

  constructor(public navCtrl: NavController, private navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
  	this.presentLoadingDefault();
  	this.http.get(Constants.URL + '/resultados/restaurant/waiter?idRestaurant=' + this.navParams.get('idRestaurant'))
		  .map(res => res.json())
		  .finally(
		  	() => {
        	this.hasResponse = true;
        	this.loading.dismiss();
		  	}
		  )
		  .subscribe(
		    data => {
		      this.waiters = data;
		    }
		  );
  }

  selectedWaiter(waiter: any){
  	this.navCtrl.push(VotationPage, {waiter:waiter});
  }

  presentLoadingDefault() {
	  this.loading = this.loadingCtrl.create({});
	  this.loading.present();
  }

}