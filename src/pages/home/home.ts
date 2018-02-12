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
  }

  selectedRestaurant(){
  	this.startCamera();
  	this.navCtrl.push(WaitersPage, {idRestaurant:this.idRestaurant});
  }

  startCamera(){
  	this.cameraPreview.startCamera({
		  x: 0,
		  y: 0,
		  width: window.screen.width,
		  height: window.screen.height,
		  camera: 'back',
		  tapPhoto: true,
		  previewDrag: true,
		  toBack: true,
		  alpha: 1
		}).then(
		  (res) => {
		  },
		  (error) => {
		});
	}

  presentLoadingDefault() {
	  this.loading = this.loadingCtrl.create({});
	  this.loading.present();
  }
}