
import { Component, ChangeDetectionStrategy, Input, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Camera, Device } from 'ionic-native';
import {Component} from '@angular/core';
import {NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading, ViewController} from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { Storage } from '../../providers/storage';

import * as firebase from 'firebase';

declare var window: any;


@Component({
  templateUrl: 'image-page.html',
})
export class ImagePage {

  assetCollection
  userAuth: any

  constructor(public navCtrl: NavController,
              public platform: Platform,
              private http: Http,
              private zone: NgZone
  ) {

  constructor(private _storage: Storage, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public viewCtrl: ViewController) {
  }

  trackByFunction(index, item) {
    return item.id
  }


  loadData() {
    var result = [];
    // load data from firebase...
    firebase.database().ref('assets').orderByKey().once('value', (_snapshot: any) => {

      _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
        var element = _childSnapshot.val();
        element.id = _childSnapshot.key;

        result.push(element);
      });

      this.assetCollection = result;

    });
  }

  makeFileIntoBlob(_imagePath) {

    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

        fileEntry.file((resFile) => {

          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = 'sample.jpg';
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            console.log('Failed file read: ' + e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  uploadToFirebase(_imageBlob) {
    var fileName = 'sample-' + new Date().getTime() + '.jpg';

    return new Promise((resolve, reject) => {
      var fileRef = firebase.storage().ref('images/' + fileName);

      var uploadTask = fileRef.put(_imageBlob);

      uploadTask.on('state_changed', (_snapshot) => {
        console.log('snapshot progess ' + _snapshot);
      }, (_error) => {
        reject(_error);
      }, () => {
        // completion...
        resolve(uploadTask.snapshot);
      });
    });
    actionSheet.present();
  }

  saveToDatabaseAssetList(_uploadSnapshot) {
    var ref = firebase.database().ref('assets');

    return new Promise((resolve, reject) => {

      // we will save meta data of image in database
      var dataToSave = {
        'URL': _uploadSnapshot.downloadURL, // url to access file
        'name': _uploadSnapshot.metadata.name, // name of the file
        'owner': firebase.auth().currentUser.uid,
        'email': firebase.auth().currentUser.email,
        'lastUpdated': new Date().getTime(),
      };

      ref.push(dataToSave, (_response) => {
        resolve(_response);
      }).catch((_error) => {
        reject(_error);
      });
    });

  }


  doGetPicture() {

    // TODO:
    // get picture from camera

    console.log(Device)
    let imageSource = (Device.isVirtual ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA);

    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: imageSource,
      targetHeight: 640,
      correctOrientation: true
    }).then((_imagePath) => {
      alert('got image path ' + _imagePath);
      // convert picture to blob
      return this.makeFileIntoBlob(_imagePath);
    }).then((_imageBlob) => {
      alert('got image blob ' + _imageBlob);

      // upload the blob
      return this.uploadToFirebase(_imageBlob);
    }).then((_uploadSnapshot: any) => {
      alert('file uploaded successfully  ' + _uploadSnapshot.downloadURL);

      // store reference to storage in database
      return this.saveToDatabaseAssetList(_uploadSnapshot);

    }).then((_uploadSnapshot: any) => {
      alert('file saved to asset catalog successfully  ');
    }, (_error) => {
      alert('Error ' + (_error.message || _error));
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

// Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

@Component({
  selector: "item-component",
  template: `
      <p>{{i}} - {{item.name}}</p>
      <p>{{item.lastUpdated}}</p>
      <img [src]=item.URL class="padding"/>  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {

  @Input() item: any;

  constructor() {

  public uploadImage() {
    this._storage.uploadImage(this.lastImage);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}





// @Injectable()
// export class myImage {
//   newfilename;
// }



//   private pushImage(): void {
//     this.navCtrl.push(filename, targetPath);
//   }
//









