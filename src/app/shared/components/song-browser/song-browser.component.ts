import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SongInfo} from "../../../modules/album/models/song-info";
import {PlaylistsPopupComponent} from "../playlists-popup/playlists-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NbGlobalPhysicalPosition} from "@nebular/theme";
import {ToastrHelpersService} from "../../../core/services/helpers/toastr-helpers.service";
import {SpinnerService} from "../../../core/services/helpers/spinner.service";

@Component({
  selector: 'app-song-browser',
  templateUrl: './song-browser.component.html',
  styleUrls: ['./song-browser.component.scss']
})

export class SongBrowserComponent {
  displayedColumns: string[] = ['coverImg', 'position', 'name', 'length', 'controls'];

  @Input() menuOptions: string[] = []
  @Input() dataSource: SongInfo[];

  @Output() songPlayClicked: EventEmitter<SongInfo> = new EventEmitter<SongInfo>();
  @Output() songOptionsClicked: EventEmitter<SongInfo> = new EventEmitter<SongInfo>();

  highlightedElementIndex: number = -1;

  constructor() {
    this.dataSource = []
  }


  songPlayed(songInfo: SongInfo) {
    console.log(songInfo);
    this.songPlayClicked.emit(songInfo);
  }

  songOptionsOpened(songInfo: SongInfo) {
    console.log(songInfo);
    this.songOptionsClicked.emit(songInfo);
  }
}
