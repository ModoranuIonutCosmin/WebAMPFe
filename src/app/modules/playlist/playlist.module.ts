import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistRoutingModule } from './playlist-routing.module';
import { YourPlaylistsComponent } from './pages/your-playlists/your-playlists.component';
import { PlaylistExplorerComponent } from './pages/playlist-explorer/playlist-explorer.component';
import {AlbumModule} from "../album/album.module";
import {MaterialModule} from "../material/material.module";
import {PlaylistsService} from "../../core/services/playlists/playlists.service";
import {SharedModule} from "../../shared/shared.module";
import {NbCardModule} from "@nebular/theme";
import {DirectivesModule} from "../directives/directives.module";


@NgModule({
  declarations: [
    YourPlaylistsComponent,
    PlaylistExplorerComponent
  ],
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    AlbumModule,
    MaterialModule,
    SharedModule,
    NbCardModule,
    DirectivesModule,

  ],
  providers: [
    PlaylistsService
  ]
})
export class PlaylistModule { }
