import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DurationFormatterService {

  constructor() { }

  formatLength(ticksHundredNanoSecs: number) : string {
    //timp in secunde.
    var ts = ticksHundredNanoSecs / 10_000_000;

    var hh : number = Math.floor(ts / 3600);
    var mm : number = Math.floor((ts % 3600) / 60);
    var ss : number = Math.trunc((ts % 3600) % 60);

    var hours = hh < 10 ? '0' + hh : `${hh}`;
    var minutes = mm < 10 ? '0' + mm : `${mm}`;
    var seconds = ss < 10 ? '0' + ss : `${ss}`;

    return ((hours != "00") ? ( hours + ":") : "") + minutes + ":" + seconds;
  }
}
