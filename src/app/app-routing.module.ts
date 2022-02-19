import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'album',
    loadChildren: () => import('./modules/album/album.module').then(m => m.AlbumModule)
  },
  {
    path: 'explorer',
    loadChildren: () => import('./modules/explorer/explorer.module').then(m => m.ExplorerModule)
  },
  {
    path: 'song',
    loadChildren: () => import('./modules/song/song.module').then(m => m.SongModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/search-results/search-results.module').then(m => m.SearchResultsModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./modules/upload/upload.module').then(m => m.UploadModule)
  },
  {
    path: 'playlist',
    loadChildren: () => import('./modules/playlist/playlist.module').then(m => m.PlaylistModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
