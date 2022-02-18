import {Component, HostBinding, HostListener, ViewChild} from '@angular/core';
import {NbPosition, NbTrigger} from "@nebular/theme";
import {AuthenticationService} from "./core/authentication/authentication.service";
import {BehaviorSubject} from "rxjs";
import {HeaderService} from "./core/header/header.service";
import {SpinnerService} from "./core/services/helpers/spinner.service";
import {AlertsService} from "./core/services/alerts/alerts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Music player';

  isLoading$: BehaviorSubject<boolean>;
  serverDown$: BehaviorSubject<boolean>;
  constructor(private spinnerService: SpinnerService,
              private alertsService: AlertsService) {
    this.isLoading$ = spinnerService.isLoading$;
    this.serverDown$ = alertsService.serverDown$;
  }
}
