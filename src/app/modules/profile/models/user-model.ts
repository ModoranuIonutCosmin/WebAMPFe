import {SubscriptionModel} from "./subscription-model";

export interface UserModel {
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  subscription: SubscriptionModel
}
