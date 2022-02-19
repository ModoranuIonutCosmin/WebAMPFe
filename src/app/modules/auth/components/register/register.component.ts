import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../core/authentication/authentication.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  user: any = {};
  rememberMe = false;
  submitted = false;
  redirectDelay = 3000;
  errors: string[] = [];

  constructor(private fb: FormBuilder, private authService : AuthenticationService,
              private router: Router,
              private toastrService: NbToastrService) {
    this.form = this.fb.group({
      username: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    })
  }

  ngOnInit(): void {

  }

  register(): void {
    var value = this.form.value;

    if(this.form.valid) {
      this.authService.register(value)
        .subscribe((res) => {
          setTimeout(() => {
            return this.router.navigate(['auth/login'])
          }, this.redirectDelay);
          this.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'success', 'Registration was succesful! Welcome aboard.')
        }, error => {
          console.log(error)
          this.errors = [error.error.detail];
        })
    }

  }
  showMessage(position: NbGlobalPhysicalPosition, status: string, message: string) {
    this.toastrService.show(status || 'Success', `${message}`, { position, status });
  }
}
