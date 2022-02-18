import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginResponse} from "./models/login-response";
import {environment} from "../../../environments/environment";
import {LoginRequest} from "./models/login-request";
import {flatMap, shareReplay, tap} from "rxjs/operators";
import {RegisterRequest} from "./models/register-request";
import {RegisterResponse} from "./models/register-response";
import {ApiPaths} from "../../../environments/apiPaths";

@Injectable()
export class AuthenticationService {
  user: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) {

    if (this.isLoggedIn()) {
      this.user.next(this.getUsername());
    }
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    let loginRequest: LoginRequest = {
      userName: username,
      password: password
    }

    return this.httpClient
      .post<LoginResponse>(environment.baseUrl + ApiPaths.loginService,
        loginRequest)
      .pipe(tap(res => {
        AuthenticationService.setSession(res);
        this.user.next(res.userName);
      }),
        shareReplay());
  }

  public register(registerRequest: RegisterRequest) {
    return this.httpClient
      .post<RegisterResponse>(environment.baseUrl + ApiPaths.registerService,
        registerRequest)
      .pipe(
        shareReplay());
  }

  private static setSession(loginResponse: LoginResponse) {
    const expiresAt = loginResponse.expires

    localStorage.setItem('id_token', loginResponse.jwtToken);
    localStorage.setItem("expires_at", expiresAt.toString());
    localStorage.setItem("userNonce", JSON.stringify({userName: loginResponse.userName}));
  }

  public isLoggedIn() {

    return !!localStorage.getItem('id_token') && !!localStorage.getItem('expires_at');
  }

  getExpiration(): Date {
    const expiration = localStorage.getItem("expires_at") ?? "";

    return new Date(expiration);
  }

  getUsername(): string {

    let userPublicData: string = localStorage.getItem("userNonce")  || '{}';

    return JSON.parse(userPublicData).userName;
  }


  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.user.next('');
  }
}
