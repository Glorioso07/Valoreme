import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Constants } from '../../utils/constants';
import { WaitersPage } from '../waiters/waiters';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { CameraPreview } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	loading: any = null;
	hasResponse: boolean = false;
	restaurants: any = [];
	idRestaurant: string = null;
	directionFront: string = 'front';
	directionBack: string = 'back';

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, private cameraPreview: CameraPreview) {
  	this.presentLoadingDefault();
  	this.http.get(Constants.URL + '/restaurant/list')
	  .map(res => res.json())
	  .finally(
	  	() => {
    	this.hasResponse = true;
    	this.loading.dismiss();
	  	}
	  )
	  .subscribe(
	    data => {
	      this.restaurants = data;
	    }
	  );
	this.http.post(Constants.URL + '/votation/start', undefined).subscribe(data => {});
  }

  selectedRestaurant(){
  	this.startCamera(this.directionFront);
  	this.navCtrl.push(WaitersPage, {idRestaurant:this.idRestaurant});
  }

  startCamera(direction){
  	try {
  		this.cameraPreview.startCamera({
		  x: 0,
		  y: 0,
		  width: window.screen.width,
		  height: window.screen.height,
		  camera: direction,
		  tapPhoto: true,
		  previewDrag: true,
		  toBack: true,
		  alpha: 1
		}).then(
		  (res) => {
		  },
		  (error) => {
		  	if(direction !== this.directionBack){
		  		this.startCamera(this.directionBack);
		  	}
		});
	}catch (e){
	    if(direction !== this.directionBack){
	  		this.startCamera(this.directionBack);
	  	}
	}
  }

  presentLoadingDefault() {
	  this.loading = this.loadingCtrl.create({});
	  this.loading.present();
  }
}