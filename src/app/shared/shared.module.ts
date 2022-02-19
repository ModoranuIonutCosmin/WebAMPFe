import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LengthFormatPipe} from "./pipes/length-format.pipe";
import {PlayerComponent} from "./components/player/player.component";
import {SearchbarComponent} from "./components/searchbar/searchbar.component";
import {HeaderComponent} from "./components/header/header.component";
import {
  NbButtonModule,
  NbContextMenuModule,
  NbIconModule, NbInputModule,
  NbLayoutModule, NbMenuModule, NbProgressBarModule,
  NbSearchModule,
  NbSidebarModule, NbToastrModule, NbToastrService, NbUserModule
} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PlaylistsPopupComponent} from "./components/playlists-popup/playlists-popup.component";
import {MatDialogModule} from "@angular/material/dialog";
import {SearchService} from "../core/services/search/search.service";
import {AlbumService} from "../core/services/media/album/album.service";
import {PlaylistsService} from "../core/services/playlists/playlists.service";
import {SongService} from "../core/services/media/songs/song.service";
import {SongBrowserComponent} from "./components/song-browser/song-browser.component";
import {MatTab} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {DirectivesModule} from "../modules/directives/directives.module";


@NgModule({
  declarations: [
    LengthFormatPipe,
    PlayerComponent,
    SearchbarComponent,
    PlaylistsPopupComponent,
    HeaderComponent,
   SongBrowserComponent],
    imports: [
        CommonModule,
        NbSidebarModule.forRoot(),
        NbLayoutModule,
        NbEvaIconsModule,
        NbIconModule,
        NbSidebarModule,
        NbSearchModule,

        NbContextMenuModule,
        NbMenuModule.forRoot(),
        NbInputModule,
        NbButtonModule,
        NbProgressBarModule,
        NbUserModule,
        NbToastrModule,
        NbToastrModule.forRoot(),

        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        DirectivesModule,
        MatButtonModule
    ],
  exports: [
    LengthFormatPipe,
    PlayerComponent,
    SearchbarComponent,
    PlaylistsPopupComponent,
    HeaderComponent,
    SongBrowserComponent
  ],
  providers: [

    PlaylistsService,
    AlbumService,
    SearchService,
    SongService,
    NbToastrService
  ]
})
export class SharedModule {
}
