import { Component, OnInit } from '@angular/core';
import {PlaylistInfo} from "../../models/playlist-info";
import {Router} from "@angular/router";
import {PlaylistsService} from "../../../../core/services/playlists/playlists.service";

@Component({
  selector: 'app-your-playlists',
  templateUrl: './your-playlists.component.html',
  styleUrls: ['./your-playlists.component.scss']
})
export class YourPlaylistsComponent implements OnInit {
  dataSource: PlaylistInfo[] = [];

  constructor(private router: Router,
              private playlistSerice: PlaylistsService) { }

  ngOnInit(): void {
    this.playlistSerice.loadMyPlaylists()
      .subscribe(result => {
        this.dataSource = result.playlists;
        this.dataSource.forEach(p => p.coverImageUrl = p.songs[0].coverImageUrl);
      })
  }

  navigateToPlaylist(playlistId: string) {
    this.router.navigate(['/playlist', playlistId])
  }
}
