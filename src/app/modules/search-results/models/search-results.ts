import {AlbumInfo} from "../../album/models/album-info";
import {SongInfo} from "../../album/models/song-info";


export interface SearchResults {
  query: string,
  results: {
    albums: AlbumInfo[],
    songs: SongInfo[]
  },
  albumEntries: number,
  songEntries: number
}
