import {SongInfo} from "../../modules/album/models/song-info";

export interface MusicActivityModel {
  sourceType?: string,
  sourceId?: string,
  songId?: string,
  isShuffled?: boolean,
  trackPosition?: number,
  songInfo?: SongInfo,
  songsIdsHistory?: Array<string>,
  songsPositionsHistory?: Array<number>,
  previousSongId?: string
}
