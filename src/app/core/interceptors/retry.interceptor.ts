import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {concatMap, delay, retryWhen} from "rxjs/operators";

export const retryCount = 3;
export const retryWaitMilliSeconds = 100;

@Injectable()
export class RetryInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen(error =>
        error.pipe(
          concatMap((error, count) => {
            if (count <= retryCount && error.status == 0) {
              return of(error);
            }
            return throwError(error);
          }),
          delay(retryWaitMilliSeconds)
        )
      )
    )
  }
}
