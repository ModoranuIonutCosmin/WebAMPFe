import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NbMenuService, NbPosition, NbTrigger} from "@nebular/theme";
import {BehaviorSubject} from "rxjs";
import {AuthenticationService} from "../../../core/authentication/authentication.service";
import {filter, map} from "rxjs/operators";
import {PlayerComponent} from "../player/player.component";
import {HeaderService} from "../../../core/header/header.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, AfterViewInit{
  exploreItems = [{title: 'Latest albums'}, {title: 'Popular'}];
  libraryItems = [{title: 'My playlists'}];
  usersControlsItems = [ {title: 'Profile'}, {title: 'Log out'} ];

  contextMenuOpenDirection: NbPosition = NbPosition.BOTTOM;
  contextMenuOpenTrigger: NbTrigger = NbTrigger.HOVER;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.tablet = event.target.innerWidth < 1200;
    console.log(this.tablet);
  }

  @ViewChild('fullHeader')
  headerElement!: ElementRef;
  overlayOpen: boolean = false;
  tablet: boolean= false;

  currentUser$: BehaviorSubject<string>;

  constructor(private authenticationService: AuthenticationService,
              private nbMenuService: NbMenuService,
              private router: Router,
              private changeTracker: ChangeDetectorRef) {
    this.currentUser$ = this.authenticationService.user;
  }

  ngOnInit(): void {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-profile-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (this.usersControlsItems[1].title === title) {
          this.authenticationService.logout();
        }

        if (this.usersControlsItems[0].title === title) {
          this.router.navigate(['/profile'])
        }
      });

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'explore-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (this.exploreItems[0].title === title) {
          this.router.navigate(['/explorer'], {queryParams: {cr: 'dateAdded', so:'desc'}})
        }

        if (this.exploreItems[1].title === title) {
          this.router.navigate(['/explorer'], {queryParams: {cr: 'popular', so:'desc'}})
        }
      });

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'library-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
          this.router.navigate(['/playlist'])
      });
  }
  ngAfterViewInit(): void {
    this.tablet = this.headerElement.nativeElement.offsetWidth < 1200;
    this.changeTracker.detectChanges();
  }

  closeOverlay(): void {
    this.overlayOpen = false;
  }
  toggleOverlay(): void{
    this.overlayOpen = ! this.overlayOpen;
  }



}
