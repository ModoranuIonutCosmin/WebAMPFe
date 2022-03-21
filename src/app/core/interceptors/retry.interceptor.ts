import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {concatMap, delay, retryWhen} from "rxjs/operators";
import {AlertsService} from "../services/alerts/alerts.service";

export const retryCount = 2;
export const retryWaitMilliSeconds = 200;

@Injectable({ providedIn: 'root' })
export class RetryInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen(error =>
        error.pipe(
          concatMap((error, count) => {
            if (count <= retryCount && error.status == 0) {
              return of(error);
            }

            if (count > retryCount) {

            }
            return throwError(error);
          }),
          delay(retryWaitMilliSeconds)
        )
      )
    )
  }
}
