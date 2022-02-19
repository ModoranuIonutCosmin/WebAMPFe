import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import {AlertsService} from "../services/alerts/alerts.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            this.alertService.setAlertStatus(false);
          } else {
            this.alertService.setAlertStatus(true);
            console.log('This is server side error');
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}
