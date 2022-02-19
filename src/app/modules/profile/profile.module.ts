import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbTabsetModule,
  NbToastrModule
} from "@nebular/theme";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "../../core/services/users/users.service";
import {ToastrHelpersService} from "../../core/services/helpers/toastr-helpers.service";


@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NbTabsetModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NbToastrModule,
    NbToastrModule.forRoot(),
    NbCheckboxModule
  ],
  providers: [
    UsersService,
    ToastrHelpersService
  ]
})
export class ProfileModule { }
