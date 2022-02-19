import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PlaylistsResponseDTO} from "../../../modules/playlist/models/playlists-response-dto";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {PlaylistInfo} from "../../../modules/playlist/models/playlist-info";
import {ApiPaths} from "../../../../environments/apiPaths";
import {SinglePlaylistResponseDTO} from "../../../modules/playlist/models/single-playlist-response-dto";
import {map} from "rxjs/operators";
import {SongInfo} from "../../../modules/album/models/song-info";

@Injectable()
export class PlaylistsService {

  constructor(private httpClient: HttpClient) {

  }

  loadSpecificPlaylist(playlistId: string): Observable<PlaylistInfo> {
    return this.httpClient.get<PlaylistInfo>(environment.baseUrl + ApiPaths.playlistByIdGet + `?playlistId=${playlistId}`);
  }

  loadMyPlaylists(): Observable<PlaylistsResponseDTO> {
    return this.httpClient.get<PlaylistsResponseDTO>(environment.baseUrl + ApiPaths.myPlaylistsGet);
  }

  createNewPlaylist(name: string, visibility = 0): Observable<SinglePlaylistResponseDTO> {
    return this.httpClient.post<SinglePlaylistResponseDTO>(environment.baseUrl + ApiPaths.createPlaylistPost, {
      name: name,
      visibility: visibility
    })
  }

  addSongToPlaylist(playlistId: string, songId: string): Observable<PlaylistInfo> {
    console.log(playlistId);
    return this.httpClient.patch<PlaylistInfo>(environment.baseUrl + ApiPaths.addSongPatch, {
      songId: songId,
      playlistId: playlistId
    });
  }

  deleteSongFromPlaylist(playlistId: string, songId: string): Observable<PlaylistInfo> {
    return this.httpClient.delete<PlaylistInfo>(environment.baseUrl + ApiPaths.deleteSong, {
      body: {
        songId: songId,
        playlistId: playlistId
      }
    });
  }

  public getSongPositionInPlaylist(playlistId:string, songId: string): Observable<SongInfo> {
    return this.loadSpecificPlaylist(playlistId).pipe(map((result, index) => {
      let songInfo = result?.songs?.find(song => song.id == songId);

      if (songInfo == undefined) {
        throw new Error('Couldnt find this song');
      }

      return songInfo;
    }))
  }

}
