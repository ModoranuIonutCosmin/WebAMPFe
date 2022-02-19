import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SongInfo} from "../../../album/models/song-info";
import {
  MusicPlayerControllerFacadeService
} from "../../../../core/services/music player/music-player-controller-facade.service";
import {PlaylistsService} from "../../../../core/services/playlists/playlists.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DurationFormatterService} from "../../../../core/services/helpers/duration-formatter.service";
import {ToastrHelpersService} from "../../../../core/services/helpers/toastr-helpers.service";
import {NbGlobalPhysicalPosition} from "@nebular/theme";
import {SpinnerService} from "../../../../core/services/helpers/spinner.service";

@Component({
  selector: 'app-playlist-explorer',
  templateUrl: './playlist-explorer.component.html',
  styleUrls: ['./playlist-explorer.component.scss']
})
export class PlaylistExplorerComponent implements OnInit {
  dataSource: SongInfo[] = [];
  playlistName: string = "";
  playlistId: string = "";

  constructor(private route: ActivatedRoute,
              private playerService: MusicPlayerControllerFacadeService,
              private playlistService: PlaylistsService,
              private durationFormatter: DurationFormatterService,

              private spinnerService: SpinnerService,
              private toastrService: ToastrHelpersService) {
  }

  ngOnInit(): void {
    this.playlistId = this.route.snapshot.params['playlistId'];

    this.spinnerService.isLoading$.next(true);

    this.playlistService.loadSpecificPlaylist(this.playlistId)
      .subscribe(result => {
        this.dataSource = result.songs;
        this.playlistName = result.name;
        this.spinnerService.isLoading$.next(false);
      }, err =>{
        this.spinnerService.isLoading$.next(false);
      })
  }

  playlistPlayClicked(songInfo: SongInfo) {
    this.playerService.startPlayingPlaylist(this.playlistId, songInfo);
  }

  removeFromPlaylist(songInfo: SongInfo) {
    this.playlistService.deleteSongFromPlaylist(this.playlistId, songInfo.id || '')
      .subscribe(result => {
        this.dataSource = this.dataSource.filter(song => song.id != (songInfo.id || ''));
        this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'success', 'Song was removed from the playlist succesfully');
      },
        err=> {
          this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'danger', 'Couldnt remove from playlist!' );
        });
  }
}
