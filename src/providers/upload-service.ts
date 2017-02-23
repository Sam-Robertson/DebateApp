

import {Injectable} from "@angular/core";
import {Transfer} from "ionic-native";


@Injectable()
export class Uploadservice{

  constructor(){}

  upload() {
    const fileTransfer = new Transfer();
    var options: any;

    options = {
      fileKey: 'file',
      fileName: 'name.jpg',
      headers: {}
    }

    fileTransfer.upload("<file path>", "<api endpoint>", options)
      .then((data) => {


      }, (err) => {


      })
  }


  declare var cordova: any;

  download() {
    const fileTransfer = new Transfer();
    let url = 'http://www.example.com/file.pdf';
    fileTransfer.download(url, cordova.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }
}




