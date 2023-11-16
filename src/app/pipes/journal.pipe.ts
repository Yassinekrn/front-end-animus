import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'journal'
})
export class JournalPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
