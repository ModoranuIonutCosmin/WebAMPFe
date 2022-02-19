import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song-routing.module';
import { SongPageComponent } from './pages/song-page/song-page.component';
import {MaterialModule} from "../material/material.module";
import {SongService} from "../../core/services/media/songs/song.service";
import {NbButtonModule, NbCardModule, NbIconModule} from "@nebular/theme";
import {DirectivesModule} from "../directives/directives.module";


@NgModule({
  declarations: [
    SongPageComponent
  ],
    imports: [
        CommonModule,
        SongRoutingModule,
        MaterialModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        DirectivesModule
    ],
  providers: [SongService]

})
export class SongModule { }
