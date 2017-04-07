import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortDate'})
export class ShortDatePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    const parts = value.split(".");
    return `${parts[0]}.${parts[1]}.`;
  }

}
