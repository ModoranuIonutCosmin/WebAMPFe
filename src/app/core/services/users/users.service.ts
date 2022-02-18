import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../../../modules/profile/models/user-model";
import {environment} from "../../../../environments/environment";
import {ApiPaths} from "../../../../environments/apiPaths";

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) {

  }

  public getUserBasicInfo(): Observable<UserModel> {
    return this.httpClient
      .get<UserModel>(environment.baseUrl + ApiPaths.profileInfo);
  }

  public putUpgradeUserSubscription(subscriptionType: number): Observable<UserModel> {
    return this.httpClient
      .put<UserModel>(environment.baseUrl + ApiPaths.profileSubcriptionUpgrade,
        {
          subscriptionType: subscriptionType
        });
  }

  public getSubscriptionName(subscriptionType: number): string {
    switch (subscriptionType)
    {
      case 0:
        return "FREE";
      case 1:
        return "PRO";
      case 2:
        return "FOUNDERS";
      default:
        return "";
    }
  }
}
