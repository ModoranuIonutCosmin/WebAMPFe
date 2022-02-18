import { Injectable } from '@angular/core';
import {MusicActivityModel} from "../../../shared/models/music-activity-model";
import {SongInfo} from "../../../modules/album/models/song-info";
import {Observable} from "rxjs";
import {PlaylistsService} from "../playlists/playlists.service";
import {AlbumService} from "../media/album/album.service";
import {map} from "rxjs/operators";

@Injectable()
export class NextSongService {

  constructor(private playlistService: PlaylistsService, private albumService: AlbumService) { }

  public pickNextSongFromList(songsList: Array<SongInfo>, currentState: MusicActivityModel): SongInfo {
    if (currentState.isShuffled) {
      let alreadyPlayed: Set<number> = new Set<number>(currentState.songsPositionsHistory || []);
      let availablePicks: Array<number> = songsList.map(song => song.position);
      console.log(songsList);
      console.log(alreadyPlayed);

      alreadyPlayed.forEach((item) => {
        var index = availablePicks.indexOf(item);
        if (index !== -1) {
          availablePicks.splice(index, 1);
        }
      }, availablePicks);

      let randomSongPosition: number;
      console.log(availablePicks);
      if (availablePicks.length == 0) {

        randomSongPosition = Math.floor(Math.random() * (songsList.length - 1)) + 1;
        console.log(randomSongPosition);
        if (randomSongPosition == currentState?.trackPosition) {
          randomSongPosition = (randomSongPosition + 1) % songsList.length;
        }

        return songsList[randomSongPosition];
      } else {
        randomSongPosition = availablePicks[Math.floor(Math.random() * availablePicks.length)]
      }

      return songsList.find(e => e.position == randomSongPosition) || songsList[0];
    }

    let nextSongIndex = (currentState.songInfo?.position || 0) % songsList.length + 1;

    return songsList[nextSongIndex - 1];
  }

  public determineNextSong(currentState: MusicActivityModel): Observable<SongInfo> {
    console.log('determining' + JSON.stringify(currentState))
    switch (currentState.sourceType) {
      case 'album':
        console.log('album');
        return this.albumService
          .getAlbumData(currentState.sourceId || '')
          .pipe(map(result => {
            result.songs?.forEach((song, index) => song.position = index + 1);

            return this.pickNextSongFromList(result.songs || [], currentState);
          }));
      case 'playlist':
        return this.playlistService
          .loadSpecificPlaylist(currentState.sourceId || '')
          .pipe(map(result => {
            result.songs?.forEach((song, index) => song.position = index + 1);

            return this.pickNextSongFromList(result.songs || [], currentState);
          }));
      default:
        return Observable.create( () => currentState.songInfo);
    }
  }
}
