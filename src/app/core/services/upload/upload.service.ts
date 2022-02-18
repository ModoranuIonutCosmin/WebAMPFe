import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from "@angular/common/http";
import {ApiPaths} from "../../../../environments/apiPaths";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {AlbumInfo} from "../../../modules/album/models/album-info";

@Injectable()
export class UploadService {

  constructor(private httpClient: HttpClient) {

  }

  uploadFileMetadata(albumMetadata: AlbumInfo): Observable<AlbumInfo> {
    return this.httpClient
      .post<AlbumInfo>(environment.baseUrl + ApiPaths.uploadAlbumMetadataPost, albumMetadata);
  }

  uploadFile(file: File, albumId: string, songId: string): Observable<HttpEvent<any>> {
    let formData = new FormData();
    formData.append('formFile', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST',
      environment.baseUrl + ApiPaths.uploadAlbumPost + `?albumId=${albumId}&songId=${songId}`, formData, options);
    return this.httpClient.request(req);
  }

}
