import {AlbumInfo} from "./album-info";

export interface AlbumListDTO {
  page: number,
  count: number,
  returnedAlbumsCount: number,
  totalAlbumsCount: number,
  albums: Array<AlbumInfo>
}
