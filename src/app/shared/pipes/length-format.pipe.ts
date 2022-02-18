import { Pipe, PipeTransform } from '@angular/core';
import {DurationFormatterService} from "../../core/services/helpers/duration-formatter.service";

@Pipe({
  name: 'lengthFormat'
})
export class LengthFormatPipe implements PipeTransform {

  constructor(private durationFormatter: DurationFormatterService) {
  }
  transform(value: number, ...args: unknown[]): string {
    return this.durationFormatter.formatLength(value);
  }
}
