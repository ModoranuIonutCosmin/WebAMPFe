import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Injectable()
export class SpinnerService {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isLoading$.next(false);
      }
    })
  }
}
