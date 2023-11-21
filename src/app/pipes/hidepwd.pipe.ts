import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidepwd',
})
export class HidepwdPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    //show only the first two letters of the password and the rest are stars
    let newStr = '';
    for (let i = 0; i < value.toString().length; i++) {
      if (i < 2) {
        newStr += value.toString()[i];
      } else {
        newStr += '*';
      }
    }
    return newStr;
  }
}
