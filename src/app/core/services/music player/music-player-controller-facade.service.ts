import {Injectable} from '@angular/core';
import {AudioService} from "./audio.service";
import {BehaviorSubject, timer} from "rxjs";
import {MusicActivityService} from "../states/music-activity.service";
import {MusicActivityModel} from "../../../shared/models/music-activity-model";
import {MediaService} from "../media/media.service";
import {SongInfo} from "../../../modules/album/models/song-info";
import {NextSongService} from "./next-song.service";
import {SongService} from "../media/songs/song.service";
import {switchMap} from "rxjs/operators";
import {AlbumService} from "../media/album/album.service";
import {PlaylistsService} from "../playlists/playlists.service";

@Injectable()
export class MusicPlayerControllerFacadeService {
  playerStatus: BehaviorSubject<string>;
  latestUserActivity: BehaviorSubject<MusicActivityModel>;

  constructor(private audioService: AudioService,
              private musicActivityService: MusicActivityService,
              private mediaService: MediaService,
              private nextSongService: NextSongService,
              private songService: SongService,
              private albumService: AlbumService,
              private playlistService: PlaylistsService) {
    this.playerStatus = audioService.playerStatus;
    this.latestUserActivity = musicActivityService.latestUserActivity;

    this.playerStatus.subscribe(status => {
      if (status == 'ended') {
        //determina urmatoarea melodie si fa play
        this.playNextSong();
      }
    })

    //pregateste ultima muzica pusa.
    mediaService.getSongUrl(this.latestUserActivity.value.songInfo?.id || "")
      .subscribe(url => {
        this.audioService.setUrl(url.url);
        this.audioService.seekAudio(this.latestUserActivity.value.trackPosition || 0);
      })

    //Event to keep track of current playing time
    timer(500, 1000).subscribe(
      _ => {
        this.musicActivityService.updateCurrentTimeStamp(this.audioService.audio.currentTime);
      }
    )
  }

  getPlayerStatusStream(): BehaviorSubject<string> {
    return this.playerStatus;
  }

  getUserActivity(): BehaviorSubject<MusicActivityModel> {
    return this.latestUserActivity;
  }

  startPlayingSingularSong(songInfo: SongInfo): void {
    console.log('Avem songInfo: ' + JSON.stringify(songInfo))
    this.mediaService.getSongUrl(songInfo.id || "")
      .subscribe(url => {
        this.musicActivityService.updateCurrentSongActivity('song', songInfo, [songInfo.id || ""],
          [songInfo.position], "", songInfo.id || "");
        this.audioService.setAudio(url.url);
      })
  }

  startPlayingAlbum(albumId: string, songInfo: SongInfo): void {
    this.musicActivityService.updateCurrentSongActivity('album', songInfo, [songInfo.id || ""],
      [songInfo.position], "", albumId || "");

    this.mediaService.getSongUrl(songInfo?.id || "")
      .subscribe(url => {
        this.audioService.setAudio(url.url);
      })
  }

  startPlayingPlaylist(playlistId: string, songInfo: SongInfo): void {
    this.musicActivityService.updateCurrentSongActivity('playlist', songInfo, [songInfo.id || ""],
      [songInfo.position], "", playlistId || "");

    this.mediaService.getSongUrl(songInfo?.id || "")
      .subscribe(url => {
        this.audioService.setAudio(url.url);
      })
  }

  pauseCurrentSong(): void {
    this.audioService.pauseAudio()
  }

  resumeCurrentSong(): void {
    this.audioService.playAudio()
  }

  seekToPercentage(position: number): void {
    this.audioService.seekAudio(position);
  }

  seekSkipMiliseconds(msecAmount: number, forwards: boolean): void {
    let secondsAddedQuanity = msecAmount / 1000 * (forwards ? 1 : -1);
    let currentProgress = this.audioService.audio.currentTime;

    if (currentProgress - secondsAddedQuanity < 0) {
      this.audioService.seekAudio(0);
      return;
    }

    this.audioService.seekAudio(currentProgress + secondsAddedQuanity);
  }

  toggleShuffle(shuffleValue: boolean) {
    this.musicActivityService.updateShuffleFlag(shuffleValue);
  }

  playPreviousSong(): void {
    let playedSongs = this.latestUserActivity.value.songsIdsHistory || [];
    let songSource = this.latestUserActivity.value.sourceType;
    let songSourceId = this.latestUserActivity.value.sourceId;

    if (playedSongs.length < 2) {
      return;
    }
    playedSongs.pop();
    let songToPlay = playedSongs.length - 1;

    while(songToPlay >= 0 && playedSongs[songToPlay] == this.latestUserActivity.value.songInfo?.id) {
      songToPlay--;
    }

    if (songToPlay == -1) {
      return;
    }
    if (songSource == 'album') {
      this.albumService.getSongPositionInAlbum(songSourceId || '', playedSongs[songToPlay])
        .pipe(switchMap((value, index) => {
          this.musicActivityService.updateCurrentPlayingSong(value);

          return this.mediaService.getSongUrl(value.id || '');
        })).subscribe((url) => {
        this.audioService.setAudio(url.url);
      });
    } else {
      this.playlistService.getSongPositionInPlaylist(songSourceId || '', playedSongs[songToPlay])
        .pipe(switchMap((value, index) => {
          this.musicActivityService.updateCurrentPlayingSong(value);

          return this.mediaService.getSongUrl(value.id || '');
        })).subscribe((url) => {
        this.audioService.setAudio(url.url);
      });
    }


  }


  playNextSong(): void {
    this.nextSongService
      .determineNextSong(this.latestUserActivity.value)
      .subscribe(song => {
        console.log('next song ' + song);
        this.musicActivityService.updateCurrentPlayingSong(song);
        this.mediaService.getSongUrl(song.id || "")
          .subscribe(result => {
            this.audioService.setAudio(result.url);
          })
      });
  }
}
