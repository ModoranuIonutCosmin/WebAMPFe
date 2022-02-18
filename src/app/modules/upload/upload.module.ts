import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { AlbumUploadComponent } from './pages/album-upload/album-upload.component';
import {DirectivesModule} from "../directives/directives.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";
import {UploadService} from "../../core/services/upload/upload.service";
import {
  NbAccordionModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbProgressBarModule,
  NbStepperModule
} from "@nebular/theme";
import {UsersService} from "../../core/services/users/users.service";


@NgModule({
  declarations: [
    AlbumUploadComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbStepperModule,
    NbAccordionModule,
    NbProgressBarModule,
  ],
  providers: [UploadService, UsersService]
})
export class UploadModule { }
