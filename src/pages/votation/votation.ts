import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Constants } from '../../utils/constants';
import { VotationSuccessPage } from '../votation/success';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { CameraPreview } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-votation',
  templateUrl: 'votation.html'
})
export class VotationPage {

	loading: any = null;
	waiter: any = null;
	votations: Array<number> = [5,4,3,2,1];

  constructor(public navCtrl: NavController, private navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, private cameraPreview: CameraPreview,
    private toastCtrl: ToastController) {
  	this.waiter = this.navParams.get('waiter');
  }

  sendValoration(points: number){
  	this.presentLoadingDefault();
  	this.getPicture(points);
  }

  getPicture(points: number){
  	this.cameraPreview.takePicture({
	  	width: 400,
	  	height: 400,
	  	quality: 100
		}).then((image) => {
		  this.sendRequest(points, image && image.length > 0 ? 'data:image/jpeg;base64,' + image[0] : null);
		}, (error) => {
			this.sendRequest(points, null);
		});
  }

  sendRequest(points: number, image: string){
    this.http.post(Constants.URL + '/votation/waiter?idWaiter=' + this.waiter.id, 
    JSON.stringify({
      points: points,
      photo: image
    }))
    .finally(
      () => {
        this.loading.dismiss();
      }
    )
    .subscribe(
      data => {
        this.navCtrl.push(VotationSuccessPage);
      },
      error => {
        let toast = this.createToast('Error en la votación');
        toast.present();
      }
    );
  }

  createToast(message: string) {
    return this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top'
    });
  }

  presentLoadingDefault() {
		this.loading = this.loadingCtrl.create({});
		this.loading.present();
  }

  goBack(){
    this.navCtrl.pop();
  }

}