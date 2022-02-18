import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {PlaylistsResponseDTO} from "../../../modules/playlist/models/playlists-response-dto";
import {PlaylistsService} from "../../../core/services/playlists/playlists.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlaylistInfo} from "../../../modules/playlist/models/playlist-info";

@Component({
  selector: 'app-playlists-popup',
  templateUrl: './playlists-popup.component.html',
  styleUrls: ['./playlists-popup.component.scss']
})
export class PlaylistsPopupComponent implements OnInit {
  @Input() dataSource: PlaylistsResponseDTO = {playlists: []};
  filteredPlaylists: PlaylistInfo[] = []
  readOnly: boolean = true;
  enteredName: string = "";
  songId: string = "";
  filterText: string = "";

  constructor(private playlistService: PlaylistsService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<PlaylistsPopupComponent>) {
    this.songId = data.songId;
  }

  ngOnInit(): void {

    this.playlistService.loadMyPlaylists()
      .subscribe(result => {
        this.dataSource = result;

        this.filteredPlaylists = this.dataSource.playlists;

        console.log(this.filteredPlaylists);
      })
  }

  addNewPlaylist() {
    this.readOnly = false;
  }

  resetFromEdit() {
    this.enteredName = "";
  }

  finishEditing() {
    this.playlistService.createNewPlaylist(this.enteredName, 0)
      .subscribe(result => {
        let playlistInfo: PlaylistInfo = {
          name: this.enteredName,
          id: result.playlistId,
          visibility: 0,
          songs: []
        }
        this.dataSource.playlists.push(playlistInfo);
        this.filteredPlaylists.unshift(playlistInfo)
        this.resetFromEdit();
      })
  }

  addSongToPlaylist(playlistId: string) {
    console.log(playlistId)
    this.playlistService.addSongToPlaylist(playlistId, this.songId)
      .subscribe(result => {
          this.dialogRef.close(1)
        },
        error => {
          this.dialogRef.close(0);
        })
  }

  filterPlaylists() {
    this.filteredPlaylists = this.dataSource.playlists
      .filter(e => e.name.toLowerCase().includes(this.filterText.toLowerCase()))
  }
}
