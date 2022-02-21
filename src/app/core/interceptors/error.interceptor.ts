import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import {AlertsService} from "../services/alerts/alerts.service";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertsService,
              private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.alertService.setAlertServerDownStatus(false);
      }
    })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(result => {
        }, (error: HttpErrorResponse) => {
            console.log("err:" + JSON.stringify(error));

            let errorMsg = '';
            if (error.status == 0) {
              this.alertService.setAlertServerDownStatus(true);
            }

            return throwError(errorMsg);
          })
      )
  }
}
