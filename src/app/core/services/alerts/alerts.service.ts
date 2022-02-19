import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class AlertsService {
  serverDown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {

  }

  setAlertStatus(visible: boolean) {
    this.serverDown$.next(visible);
  }

}
