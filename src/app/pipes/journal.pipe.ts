import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'journal',
})
export class JournalPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Capitalize the first letter and make it bold
    const transformedValue =
      '[ "' + value.charAt(0).toUpperCase() + value.slice(1) + '" ]';

    return transformedValue;
  }
}
