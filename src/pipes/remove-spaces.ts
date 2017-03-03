import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the RemoveSpaces pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'RemoveSpaces'
})
@Injectable()
export class RemoveSpaces {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value) {
    value = value + ''; // make sure it's a string
    return value.replace(/ /g, "");
  }
}
