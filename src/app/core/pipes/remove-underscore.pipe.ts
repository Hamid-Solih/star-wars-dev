import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscore',
  standalone: true,
})
export class RemoveUnderscorePipe implements PipeTransform {
  transform(value?: string | number, args?: any): any {
    if (!value) return value;
    let cleanValue = value.toString();
    while (cleanValue.includes('_')) {
      cleanValue = cleanValue.replace('_', ' ');
    }
    return cleanValue;
  }
}
