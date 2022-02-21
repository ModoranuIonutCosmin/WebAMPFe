import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../authentication/authentication.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(tap((event: HttpEvent<any>) => {
      }, (err: any) => {
        console.log("ui" + JSON.stringify(err));
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log('unauthorized');
            this.auth.logout()
            this.router.navigate(['auth/login'])
          }
        }
      }));
  }
}
