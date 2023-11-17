import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'journal',
})
export class JournalPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }

    // Capitalize the first letter and make it bold
    const transformedValue = `<b>${value
      .charAt(0)
      .toUpperCase()}</b>${value.slice(1)}`;

    return transformedValue;
  }
}
