import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ResourceUrlResponse} from "../../../shared/models/resource-url-response";
import {MusicActivityModel} from "../../../shared/models/music-activity-model";
import {ApiPaths} from "../../../../environments/apiPaths";

@Injectable()
export class MediaService {

  constructor(private httpClient: HttpClient) { }

  public getSongUrl(songId: string): Observable<ResourceUrlResponse> {
    return this.httpClient
      .get<ResourceUrlResponse>(environment.baseUrl + ApiPaths.mediaService + `?songId=${songId}`)
  }



}
