import { Injectable } from '@angular/core';
import {SongInfo} from "../../../../modules/album/models/song-info";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {ApiPaths} from "../../../../../environments/apiPaths";

@Injectable()
export class SongService {

  constructor(private httpClient: HttpClient) { }

  public getSongDetails(songId: string):  Observable<SongInfo> {
    return this.httpClient
      .get<SongInfo>(environment.baseUrl + ApiPaths.songInfoGet + `?songId=${songId}`);
  }
}
