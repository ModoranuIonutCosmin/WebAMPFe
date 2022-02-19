import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FavoriteResponseDTO} from "../../../modules/album/models/favorite-response-dto";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {ApiPaths} from "../../../../environments/apiPaths";

@Injectable()
export class FavoritesService {

  constructor(private httpClient: HttpClient) {

  }

  addAlbumToFavorites(albumId: string): Observable<FavoriteResponseDTO> {
    return this.httpClient
      .post<FavoriteResponseDTO>(environment.baseUrl + ApiPaths.addToFavorite + `?albumId=${albumId}`, {})
  }

  deleteAlbumFromFavorites(albumId: string): Observable<void> {
    return this.httpClient.delete<void>(environment.baseUrl + ApiPaths.deleteFromFavorite + `?albumId=${albumId}`)
  }

  checkIfCurrentUserFavoritedAlbum(albumId: string): Observable<FavoriteResponseDTO> {
    return this.httpClient.get<FavoriteResponseDTO>(environment.baseUrl + ApiPaths.checkFavoriteStatus + `?albumId=${albumId}`)
  }
}
