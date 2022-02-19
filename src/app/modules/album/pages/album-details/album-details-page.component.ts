import {Component, OnInit} from '@angular/core';
import {SongInfo} from "../../models/song-info";
import {ActivatedRoute} from "@angular/router";
import {flatMap, mergeMap} from "rxjs/operators";
import {AlbumService} from "../../../../core/services/media/album/album.service";
import {AlbumInfo} from "../../models/album-info";
import {DurationFormatterService} from "../../../../core/services/helpers/duration-formatter.service";
import {
  MusicPlayerControllerFacadeService
} from "../../../../core/services/music player/music-player-controller-facade.service";
import {PlaylistsPopupComponent} from "../../../../shared/components/playlists-popup/playlists-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastrHelpersService} from "../../../../core/services/helpers/toastr-helpers.service";
import {NbGlobalPhysicalPosition} from "@nebular/theme";
import {SpinnerService} from "../../../../core/services/helpers/spinner.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details-page.component.html',
  styleUrls: ['./album-details-page.component.scss']
})
export class AlbumDetailsPage implements OnInit {
  albumData!: AlbumInfo;

  songsData: SongInfo[] = [];
  albumId!: string

  isLoading$: Observable<boolean>


  constructor(private route: ActivatedRoute,
              private albumService: AlbumService,
              private durationFormatter: DurationFormatterService,
              private playerService: MusicPlayerControllerFacadeService,

              private toastrService: ToastrHelpersService,
              private spinnerService: SpinnerService,
              private dialog: MatDialog
              ) {
    this.isLoading$ = spinnerService.isLoading$;
  }

  ngOnInit(): void {

    this.spinnerService.isLoading$.next(true);
    this.route.params.pipe(mergeMap((v, index) => {
      this.albumId = v['albumId'];

      return this.albumService.getAlbumData(this.albumId);
    })).subscribe(data => {
      this.albumData = data;
      this.songsData = data.songs || [];

      this.songsData.forEach((value, index) =>
      {
        let coverUrl = value.coverImageUrl;
        if(!(coverUrl && coverUrl.trim())){
          value.coverImageUrl = data.coverImageUrl
        }
      });
      this.spinnerService.isLoading$.next(false);
    }, err => {
    });
  }


  openDialog(songId: string) {
    const dialogRef = this.dialog.open(PlaylistsPopupComponent, {
      data: {songId: songId}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'success', 'Song was added to playlist succesfully');
      } else {
        this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'danger', 'Couldnt add song to playlist' );
      }
    });
  }

  addSongToPlaylist(songInfo: SongInfo) {
    console.log('playing' + JSON.stringify(songInfo));

    this.openDialog(songInfo.id || '');
  }


  songPlayClicked(songInfo: SongInfo) {
    console.log('playing' + JSON.stringify(songInfo));
    this.playerService.startPlayingAlbum(this.albumId, songInfo);
  }
}
