import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import {AuthenticationService} from "../../core/authentication/authentication.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';
import {MaterialModule} from "../material/material.module";
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbToastrModule,
  NbToastrService
} from "@nebular/theme";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NbInputModule,
    NbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    NbButtonModule,
    NbToastrModule,
    NbToastrModule.forRoot(),
  ],
  providers: [
    NbToastrService
  ]
})
export class AuthModule { }
