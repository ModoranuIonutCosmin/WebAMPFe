import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  headerHeightMobile$:BehaviorSubject<string> = new BehaviorSubject<string>('0px');

  constructor() {

  }
}
