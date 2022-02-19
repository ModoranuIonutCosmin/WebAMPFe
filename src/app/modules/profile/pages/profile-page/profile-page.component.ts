import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user-model";
import {UsersService} from "../../../../core/services/users/users.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrHelpersService} from "../../../../core/services/helpers/toastr-helpers.service";
import {NbGlobalPhysicalPosition} from "@nebular/theme";
import {SpinnerService} from "../../../../core/services/helpers/spinner.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userProfileData!: UserModel;
  subscriptionName: string = "";
  userInfoForm: FormGroup = this.fb.group({
    userName: [{value: '', disabled: true},],
    firstName: [{value: '', disabled: true}],
    lastName: [{value: '', disabled: true}],
    email: [{value: '', disabled: true}],
  })

  constructor(private usersService: UsersService,
              private fb: FormBuilder,
              private toastrService: ToastrHelpersService,
              private spinnerService: SpinnerService) {

  }

  ngOnInit(): void {
    this.spinnerService.isLoading$.next(true);
    this.usersService.getUserBasicInfo()
      .subscribe((result) => {
          this.userProfileData = result;
          this.subscriptionName = this.usersService.getSubscriptionName(result.subscription.type);
          this.userInfoForm.patchValue(result);
          this.spinnerService.isLoading$.next(false);
        },
        err => {
          this.spinnerService.isLoading$.next(false);
        });
  }

  claimSubscription(): void {
    this.usersService.putUpgradeUserSubscription(1)
      .subscribe(result => {
          this.userProfileData = result;
          this.subscriptionName = this.usersService.getSubscriptionName(result.subscription.type);
          this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'success',
            `Your account was upgraded to ${this.subscriptionName} successfully.`);
        },
        err => {
          this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'danger',
            `Upgrade failed, please try again later.`);
        })
  }


}
