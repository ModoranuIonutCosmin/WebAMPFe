import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {YourPlaylistsComponent} from "./pages/your-playlists/your-playlists.component";
import {PlaylistExplorerComponent} from "./pages/playlist-explorer/playlist-explorer.component";

const routes: Routes = [
  {
    path: '', component: YourPlaylistsComponent,
  },
  {
    path: ':playlistId', component: PlaylistExplorerComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistRoutingModule {
}
