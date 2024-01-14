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
    return value.split(' ').slice(0, args[0]).join(' ');
  }

}
