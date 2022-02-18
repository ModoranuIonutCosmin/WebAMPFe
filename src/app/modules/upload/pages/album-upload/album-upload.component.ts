import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadService} from "../../../../core/services/upload/upload.service";
import {FileUploadInfo} from "../../models/file-upload-info";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UsersService} from "../../../../core/services/users/users.service";
import {SpinnerService} from "../../../../core/services/helpers/spinner.service";
import {BehaviorSubject} from "rxjs";
import {UserModel} from "../../../profile/models/user-model";
import {ToastrHelpersService} from "../../../../core/services/helpers/toastr-helpers.service";
import {NbGlobalPhysicalPosition} from "@nebular/theme";

@Component({
  selector: 'app-album-upload',
  templateUrl: './album-upload.component.html',
  styleUrls: ['./album-upload.component.scss']
})
export class AlbumUploadComponent implements OnInit {
  songFiles: FileUploadInfo[] = [];

  currentFile: number = 0;
  albumId: string = "";
  songIds: Array<string> =[];

  successful: boolean = true;

  userModel!: UserModel;

  stepperIndex: number = 0;

  uploadButtonBusy: boolean = false;
  uploadSuccessful: boolean = true;

  albumInfo: FormGroup = this.fb.group({
    name: ['', Validators.required],
    coverImageUrl: [''],
    description: [''],
    releaseDate: ['', Validators.required],
    songs: this.fb.array([])
  })

  isLoading$: BehaviorSubject<boolean>;

  constructor(private fb: FormBuilder,
              private uploadService: UploadService,
              private userService: UsersService,

              private spinnerService: SpinnerService,
              private toastrService: ToastrHelpersService,

              private router: Router) {
    this.isLoading$ = spinnerService.isLoading$;
    this.isLoading$.next(true);
  }

  ngOnInit(): void {
    this.userService
      .getUserBasicInfo()
      .subscribe(res => {
        this.userModel = res;
        this.isLoading$.next(false);
      }, err=> {
        this.isLoading$.next(false);
      })
  }

  navigateToEditMetadata() {
    this.stepperIndex = 1;
    this.scrollToTop()
  }

  navigateToFinishUpload() {
    this.stepperIndex = 2;
    this.scrollToTop()
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  getSongs(): FormArray {
    return this.albumInfo.get('songs') as FormArray;
  }

  getArtists(songIndex: number): FormArray {
    return this.getSongs().at(songIndex).get('artists') as FormArray;
  }

  newSong(name: string): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      artists: this.fb.array([this.fb.group({
        artistName: ['', Validators.required],
        firstName: [''],
        lastName: ['']
      })])
    })
  }

  addNewSong(name: string): void {
    this.getSongs().push(this.newSong(name))
  }

  removeSongAtIndex(songIndex: number): void {
    this.getSongs().removeAt(songIndex);
  }

  songsArtists(songIndex: number): FormArray {
    return this.getSongs().at(songIndex).get('artists') as FormArray;
  }

  newArtist(): FormGroup {
    return this.fb.group({
      artistName: ['', Validators.required],
      firstName: [''],
      lastName: ['']
    }) as FormGroup;
  }

  addNewArtist(songIndex: number): void {
    this.songsArtists(songIndex).push(this.newArtist());
  }

  removeArtistAtIndexForSong(songIndex: number, artistIndex: number): void {
    this.songsArtists(songIndex).removeAt(artistIndex);
  }

  newFilesDropped(files: any): void {
    this.addNewFiles(files as File[]);
  }

  newFilesBrowsed(event: Event): void {
    let newFiles: Array<File> = Array.from((event.target as HTMLInputElement).files || new FileList());

    this.addNewFiles(newFiles);
  }

  addNewFiles(files: File[]) {
    for (const file of files) {
      if (file.type != 'audio/mpeg' || this.songFiles.map(song => song.file).indexOf(file) != -1) {
        console.log('skipped');
        continue;
      }
      this.songFiles.push({
        file: file,
        failed: false,
        progress: 0
      });
      this.addNewSong(file.name);
    }
  }

  removeFile(ordinal: number) {
    console.log(this.songFiles)
    this.removeSongAtIndex(ordinal);
    this.songFiles.splice(ordinal, 1);
    console.log('removed at ' + ordinal)
    console.log(this.songFiles)
  }

  initFileUpload(): void {
    let albumPayload: any = this.albumInfo.value;

    console.log(this.albumInfo);
    if (!this.albumInfo.valid) {
      this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'primary',
        'Please fill in all fields before proceeding on!');
      return;
    }
    this.uploadButtonBusy = true;
    this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'basic',
      'Upload started. You can track the progress by scrolling up.');

    albumPayload.songs.forEach((song: any, index: number) => song.position = index + 1);

    albumPayload.releaseDate = new Date(albumPayload.releaseDate).toJSON()

    this.uploadService.uploadFileMetadata(albumPayload)
      .subscribe(result => {
        let songIds: Array<string> = [];

        if (result != undefined) {
          songIds = (result?.songs || [])
            .map((song: any) => song.id);
          this.songIds = songIds;
          this.albumId = result.id || "";
          this.currentFile = 0;
        }
        this.uploadNextFile();
      })

  }

  uploadNextFile(): void {
    console.log(this.songIds);

    if (this.currentFile >=  this.songIds.length) {
      this.navigateToFinishUpload();
      return;
    }

    this.uploadService
      .uploadFile(this.songFiles[this.currentFile].file, this.albumId, this.songIds[this.currentFile])
      .subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / (event.total || 1));
            this.songFiles[this.currentFile].progress = percentDone;
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
            this.currentFile++;
            this.uploadNextFile()
          }
        },
        (err) => {
          this.successful = false;
          console.log("Upload Error:", err);
          this.songFiles[this.currentFile].failed = true;
          this.uploadSuccessful = false;
        }, () => {
          console.log("Upload done");
        })
  }

  seeAlbum() {
    this.router.navigate(['/album', this.albumId]);
  }

  artistInputPlaceholder(artistIndex: number): string {
    return `Artist ${artistIndex + 1} name`
  }

  private showErrorToaster() {
    for (let control in this.albumInfo.controls) {
      this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        'primary',
        JSON.stringify(this.albumInfo.controls[control].errors))
    }
  }
}

