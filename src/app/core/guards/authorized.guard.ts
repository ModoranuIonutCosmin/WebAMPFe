import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../authentication/authentication.service";
import {ToastrHelpersService} from "../services/helpers/toastr-helpers.service";
import {NbGlobalPhysicalPosition} from "@nebular/theme";

@Injectable()
export class AuthorizedGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private toastrService: ToastrHelpersService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authenticationService.isLoggedIn()) {
      return true;
    } else {
      this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'warning',
        'You must be logged in in order to access this page!');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

}
