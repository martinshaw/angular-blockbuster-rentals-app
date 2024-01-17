import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceUntilFirstDot',
  standalone: true
})
export class SliceUntilFirstDotPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.split('.').slice(0, 1).join() + '.';
  }

}
