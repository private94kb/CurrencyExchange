import { Pipe, PipeTransform } from '@angular/core';
import { KeyValue } from "@angular/common";

@Pipe({
  name: 'currencyFilter'
})
export class CurrencyFilterPipe implements PipeTransform {

  public transform(value: KeyValue<string, number>[], filter: string): KeyValue<string, number>[] {
    if (!filter) return value;
    return value.filter(({ key }) => key.toLowerCase().startsWith(filter.toLowerCase()));
  }

}
