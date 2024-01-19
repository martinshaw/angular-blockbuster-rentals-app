import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceUntilFirstDot',
  standalone: true
})
export class SliceUntilFirstDotPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value == null) return value;
    if (typeof value !== 'string') return value;
    if (value.length === 0) return value;

    return value.split('.').slice(0, 1).join() + '.';
  }

}
