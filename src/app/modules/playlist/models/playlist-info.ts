import {SongInfo} from "../../album/models/song-info";

export interface PlaylistInfo {
  id: string,
  name: string,
  songs: SongInfo[],
  visibility: number,
  coverImageUrl?: string
}
