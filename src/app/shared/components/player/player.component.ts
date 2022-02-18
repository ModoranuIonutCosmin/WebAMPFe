import {Component, HostListener, Input, OnInit} from '@angular/core';
import {BehaviorSubject, timer} from "rxjs";
import {SongInfo} from "../../../modules/album/models/song-info";
import {
  MusicPlayerControllerFacadeService
} from "../../../core/services/music player/music-player-controller-facade.service";
import {MusicActivityModel} from "../../models/music-activity-model";
import {PlaylistsPopupComponent} from "../playlists-popup/playlists-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {ToastrHelpersService} from "../../../core/services/helpers/toastr-helpers.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  ARROW_SKIP_MSEC: number = 5000;

  @Input() paused: boolean = true;
  @Input() shuffled: boolean = false;
  songInfo: SongInfo;

  trackPositionMsec: number = 0; // 1 sec = 10e7 ticks ca unitate
                                 // de masura (sau nr tick-uri TimeSpan .net intr-o secunda)
  totalTrackTimeMsec: number = 0;

  albumId: string | undefined;
  playerStatus: BehaviorSubject<string>
  userActivity: BehaviorSubject<MusicActivityModel>

  constructor(public playerService: MusicPlayerControllerFacadeService,
              private dialog: MatDialog,
              private toastrService: ToastrHelpersService) {
    this.playerStatus = playerService.getPlayerStatusStream();
    this.userActivity = playerService.getUserActivity();

    this.songInfo = {
      position: 0,
      coverImageUrl: "",
      length: 0,
      name: ""
    };
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

  ngOnInit(): void {
    this.playerStatus.subscribe(status => {
      // if (status == "ended" || status == "pause" || status == "waiting") {
      //   this.paused = true;
      // } else if (status == "playing") {
      //   this.paused = false;
      // }
      console.log('player status' + status);
      this.paused = status != "playing";
    });
    this.userActivity.subscribe(activity => {
        this.songInfo = activity.songInfo || this.songInfo;
        this.shuffled = activity.isShuffled || false;
        this.totalTrackTimeMsec = (activity.songInfo?.length   || 0);
        this.trackPositionMsec = (activity.trackPosition || 0) * 10000000;
    })

    timer(0, 500)
      .subscribe(_ => {

        this.trackPositionMsec = (this.userActivity.value.trackPosition || 0) * 10000000;
        this.songInfo = (this.userActivity.value.songInfo) || this.songInfo;
      })
  }

  progressPercent(): number {
    return (this.trackPositionMsec/ (this.totalTrackTimeMsec + 0.00001)) * 100;
  }

  seek(event: any): void {
    let progressBarRect: any = event.target.getBoundingClientRect();

    let clickX = event.clientX;
    let progressBarWidth = progressBarRect.right - progressBarRect.left;
    let clickDistance = clickX - progressBarRect.left;

    let percentSeek = clickDistance / (progressBarWidth + 0.0001);
    this.playerService.seekToPercentage((this.totalTrackTimeMsec / 10_000_000) * percentSeek);
  }

  playSong() {

    if (!this.paused) {
      this.playerService.pauseCurrentSong();
      this.paused = !this.paused;
      console.log('Punem melodie pe pause!');
      return;
    }

    console.log('Punem melodie sa cante!');
    this.paused = !this.paused;
    this.playerService.resumeCurrentSong();
  }

  playNextSong() {
    this.playerService.playNextSong();
  }

  playPreviousSong() {
    this.playerService.playPreviousSong();
  }

  toggleShuffle() {
    this.shuffled = !this.shuffled;
    this.playerService.toggleShuffle(this.shuffled);
  }
}
