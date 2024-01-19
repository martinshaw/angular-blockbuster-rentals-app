import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceWord',
  standalone: true
})
export class SliceWordPipe implements PipeTransform {

  /**
   * Splits by word, not character, so that strings aren't cut off prema
   */
  transform(value: string, ...args: [number]): unknown {
    if (value == null) return value;
    if (typeof value !== 'string') return value;
    if (value.length === 0) return value;

    return value.split(' ').slice(0, args[0]).join(' ');
  }

}
