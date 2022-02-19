import { Injectable } from '@angular/core';
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

@Injectable({
  providedIn: 'root'
})
export class ToastrHelpersService {

  constructor(private toastrService: NbToastrService) { }


  showMessage(position: NbGlobalPhysicalPosition, status: string, message: string) {
    this.toastrService.show(status || 'Success', `${message}`, { position, status, duration: 3000 });
  }
}
