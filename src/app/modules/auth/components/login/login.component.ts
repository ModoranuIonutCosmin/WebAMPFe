import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../core/authentication/authentication.service";
import {NbGlobalPhysicalPosition, NbPosition, NbToastrService} from "@nebular/theme";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  rememberMe = false;
  submitted = false;
  redirectDelay = 3000;
  errors: string[] = [];

  constructor(protected service: AuthenticationService,
              protected cd: ChangeDetectorRef,
              protected router: Router,
              private toastrService: NbToastrService
              ) {

  }

  login(): void {

    this.service.login(this.user.userName, this.user.password)
      .subscribe((result) => {
      this.submitted = false;

        this.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'success', 'Login was succesful! Welcome back.')
        setTimeout(() => {
          return this.router.navigateByUrl('/');
        }, this.redirectDelay);
      this.cd.detectChanges();
    }, (error) => {
        this.submitted = false;
        this.errors = ['Invalid credentials', error.error.detail];
      });
  }

  showMessage(position: NbGlobalPhysicalPosition, status: string, message: string) {
    this.toastrService.show(status || 'Success', `${message}`, { position, status });
  }
  ngOnInit(): void {
  }

}
