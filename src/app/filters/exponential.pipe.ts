import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponential'
})
export class ExponentialPipe implements PipeTransform {

  transform(value: number, ...args: any[]): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }
}
