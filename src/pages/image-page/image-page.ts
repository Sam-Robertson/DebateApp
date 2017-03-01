import {Component} from '@angular/core';
import {NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading, ViewController} from 'ionic-angular';
import { Camera, File, FilePath } from 'ionic-native';
import { Storage } from '../../providers/storage';

//


declare var cordova: any;
declare var window: any;


@Component({
  selector: 'page-image',
  templateUrl: 'image-page.html'
})

export class ImagePage {
  lastImage: string = null;
  loading: Loading;

  constructor(private _storage: Storage, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public viewCtrl: ViewController) {
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  // saveToDatabaseAssetList(_uploadSnapshot) {
  //   var ref = firebase.database().ref('assets');
  //
  //   return new Promise((resolve, reject) => {
  //
  //     // we will save meta data of image in database
  //     var dataToSave = {
  //       'URL': _uploadSnapshot.downloadURL, // url to access file
  //       'name': _uploadSnapshot.metadata.name, // name of the file
  //       'owner': firebase.auth().currentUser.uid,
  //       'email': firebase.auth().currentUser.email,
  //       'lastUpdated': new Date().getTime(),
  //     };
  //
  //     ref.push(dataToSave, (_response) => {
  //       resolve(_response);
  //     }).catch((_error) => {
  //       reject(_error);
  //     });
  //   });
  //
  // }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        FilePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  public createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }


// Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
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

  // uploadToFirebase(newFileName) {
  //
  //
  //   return new Promise((resolve, reject) => {
  //
  //
  //     var fileRef = firebase.storage().ref('images/' + newFileName);
  //
  //     var uploadTask = fileRef.put(newFileName);
  //
  //     uploadTask.on('state_changed', (_snapshot) => {
  //       console.log('snapshot progess ' + _snapshot);
  //     }, (_error) => {
  //       reject(_error);
  //     }, () => {
  //       // completion...
  //       resolve(uploadTask.snapshot);
  //     });
  //   });
  // }

  // public uploadImage() {
  //   return this.uploadToFirebase(this.lastImage).then((_uploadSnapshot: any) => {
  //   alert('file uploaded successfully  ' + _uploadSnapshot.downloadURL);

  // // store reference to storage in database
  // return this.saveToDatabaseAssetList(_uploadSnapshot);
  //
  // }).then((_uploadSnapshot: any) => {
  //   alert('file saved to asset catalog successfully  ');
  // },
  //     (_error) => {
  //     alert('Error ' + (_error.message || _error));
  //     })
  // }




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









