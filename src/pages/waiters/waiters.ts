import { Component, HostListener } from '@angular/core';
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
	intervalId: any = null;
	scrollContent: string = 'scroll-content';
	visible: string = 'visible';

  constructor(public navCtrl: NavController, private navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
  	this.presentLoadingDefault();
  	this.http.get(Constants.URL + '/restaurant/waiter?idRestaurant=' + this.navParams.get('idRestaurant'))
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

  initInterval(){
  	this.intervalId = setInterval(() => {
  		let elementsVisible = document.getElementsByClassName(this.scrollContent + ' ' + this.visible);
		if(elementsVisible && elementsVisible.length === 0){
			let element = this.getScrollContent();
	  		if(element){
	  			element.classList.add(this.visible);
	  		}
		}
  	},
  	120000);
  }

  getScrollContent(): any{
  	let element;
  	let elements = document.getElementsByClassName(this.scrollContent);
	if(elements && elements.length > 0){
		element = elements[1];
	}
  	return element;
  }

  actionActivity(){
  	if(this.intervalId){
  		clearInterval(this.intervalId);
  		let element = this.getScrollContent();
  		if(element){
  			element.classList.remove(this.visible);
  		}
    	this.initInterval();
  	}
  }

  ionViewDidEnter(){
  	this.initInterval();
  }

  ionViewDidLeave() {
    clearInterval(this.intervalId);
  }

  @HostListener('click') onClick() {
    this.actionActivity();
  }
}