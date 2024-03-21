import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys',
  standalone: true
})
export class ObjectKeysPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
