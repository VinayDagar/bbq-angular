import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcFormat'
})
export class UtcFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
