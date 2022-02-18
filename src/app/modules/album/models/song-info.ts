import {ArtistInfo} from "./artist-info";

export interface SongInfo {
  id?: string,
  position: number,
  coverImageUrl: string,
  name: string,
  length: number,
  formattedLength?: string,
  artists?: ArtistInfo[]
}
