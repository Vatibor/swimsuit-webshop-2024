import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {


  transform(value: number, ...args: unknown[]): string {
    let tzoffset = (new Date(value)).getTimezoneOffset() * 60000
    let minOffset = (new Date(value)).getTime() - tzoffset
    return (new Date(minOffset)).toISOString().replace('Z', '').replace('T', ' ').split(' ')[0]
  }
}
