import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MusicActivityModel} from "../../../shared/models/music-activity-model";
import {SongInfo} from "../../../modules/album/models/song-info";
import {DurationFormatterService} from "../helpers/duration-formatter.service";

@Injectable()
export class MusicActivityService {

  public lastActivityKey: string = "last_song_activity";
  public latestUserActivity = new BehaviorSubject<MusicActivityModel>({});

  constructor(private durationFormatter: DurationFormatterService) {
    this.loadLastActivity();
  }

  public loadLastActivity(): MusicActivityModel {
    let lastActivity = localStorage.getItem(this.lastActivityKey) || '{}';

    console.log(lastActivity);

    let result = <MusicActivityModel>JSON.parse(lastActivity);
    let songInfo = result.songInfo;

    if (songInfo != null) {
      songInfo.formattedLength = this.durationFormatter.formatLength(songInfo.length);
    }

    this.latestUserActivity.next(result);

    return result;
  }

  public updateCurrentSongActivity(type: string,
                                   songInfo: SongInfo,
                                   songsIdsHistory: Array<string>,
                                   songsPositionsHistory: Array<number>,
                                   previousSongId: string,
                                   songSourceId: string) {

    if (this.latestUserActivity.value == undefined) {
      this.storeLastActivity(type, songSourceId, "", 0, songInfo, false,
        [songInfo.id || ""], [songInfo.position], "");
    }
    console.log(songSourceId);
    let currentActivity: MusicActivityModel =
    { ...this.latestUserActivity.value,
      songInfo              : songInfo,
      sourceType            : type,
      sourceId              : songSourceId,
      songId                : songInfo.id,
      previousSongId        : previousSongId,
      isShuffled            : false,
      songsPositionsHistory : songsPositionsHistory,
      songsIdsHistory       : songsIdsHistory
    }

    this.latestUserActivity.next(currentActivity);

    localStorage.setItem(this.lastActivityKey, JSON.stringify(currentActivity));
  }

  public updateCurrentPlayingSong(songInfo: SongInfo) {
    let currentActivity = this.latestUserActivity.value;

    currentActivity.songInfo = songInfo;
    currentActivity.songsPositionsHistory?.push(songInfo.position);
    currentActivity.songsIdsHistory?.push(songInfo.id|| '');


    this.latestUserActivity.next(currentActivity);

    localStorage.setItem(this.lastActivityKey, JSON.stringify(currentActivity));
  }

  public updateCurrentTimeStamp(seekPos: number) {
    let currentActivity = this.latestUserActivity.value;

    currentActivity.trackPosition = seekPos;

    this.latestUserActivity.next(currentActivity);

    localStorage.setItem(this.lastActivityKey, JSON.stringify(currentActivity));
  }

  public updateShuffleFlag(shuffleVal: boolean) {
    let currentActivity = this.latestUserActivity.value;

    currentActivity.isShuffled = shuffleVal;

    this.latestUserActivity.next(currentActivity);

    localStorage.setItem(this.lastActivityKey, JSON.stringify(currentActivity));
  }

  public storeLastActivity(type: string, sourceId: string, songId: string, seekPos: number, songInfo: SongInfo,
                           isShuffled: boolean, songsIdsHistory: Array<string>,
                           songsPositionsHistory: Array<number>,
                           previousSongId: ""): void {
    this.latestUserActivity.next(<MusicActivityModel>{
      songInfo: songInfo,
      sourceType: type,
      sourceId: sourceId,
      trackPosition: seekPos,
      isShuffled: isShuffled,
      songsIdsHistory: [],
      songsPositionsHistory: [],
      previousSongId: previousSongId
    });

    localStorage.setItem(this.lastActivityKey, JSON.stringify(this.latestUserActivity.value));
  }
}
