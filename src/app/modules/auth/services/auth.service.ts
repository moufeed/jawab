import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, mergeMap, catchError } from "rxjs/operators";

import { URLS, STORAGE } from "src/app/Shared/constants";
import { UiHelper } from "src/app/Shared/ui/UiHelper.services";

import * as jwt_decode from "jwt-decode";

import { RegisterToken } from "../Interfaces/register-token.interface";
import { ResponseProvider } from "src/app/core/Interfaces/http-response.interface";
import { SignInResponse } from "../Interfaces/signIn-response.interface";
import {
  user,
  UserStatus,
  NewMember,
  OldMember
} from "../Interfaces/Member.interface";
import { isDefined } from "src/app/core/helpers/Utilities";
import { Token } from "../Interfaces/token.interface";

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnDestroy {
  LoggedOut = new BehaviorSubject<boolean>(true);

  //#region private properties

  /**
   * @ignore
   */
  private LogOutTimer: any;
  /**
   * @ignore
   */
  private Authenticated = false;

  /**
   * @ignore
   */
  private phoneNumber: string | null;
  /**
   * @ignore
   */
  private Username: string | null;
  /**
   * @ignore
   */
  private UserId: string | null;

  /**
   * @ignore
   */
  private RegisterToken: string | undefined | null = localStorage.getItem(
    STORAGE.RegisterToken
  );

  /**
   * @ignore
   */
  private newMember: NewMember | null = JSON.parse(
    localStorage.getItem(STORAGE.NewMember)
  );
  //#endregion

  constructor(
    private http: HttpClient,
    private router: Router,
    private ui: UiHelper
  ) {
    if (this.checkTokenIsValid()) {
      this.setLogOutTimer();
      this.LoggedOut.next(false);
    }

    this.LoggedOut.subscribe(res => (this.Authenticated = !res));
  }

  //#region private methods

  /**
   * timer to auto logout
   */
  private setLogOutTimer() {
    if (this.LogOutTimer) {
      clearTimeout(this.LogOutTimer);
    }
    const token = jwt_decode(localStorage.getItem(STORAGE.Token));
    const d = new Date();
    d.setUTCSeconds(token.exp);
    const MaximumDelayValue = 2147483647; // 24.8 days
    const timeToLogout = d.valueOf() - new Date().valueOf();
    if (timeToLogout < MaximumDelayValue) {
      this.LogOutTimer = setTimeout(() => {
        this.logOut();
      }, timeToLogout);
    }
  }

  /**
   *  check if browser has a register token and generate a new one if not
   * @returns  register token
   */
  private getRegisterToken(): Observable<any> {
    if (
      this.RegisterToken !== undefined &&
      this.RegisterToken !== null &&
      typeof this.RegisterToken === "string"
    ) {
      return new Observable(observer => observer.next(this.RegisterToken));
    }
    const data = new FormData();
    const config = environment.authConfig;
    data.set("client_id", config.client_id);
    data.set("client_secret", config.client_secret);
    data.set("grant_type", config.grant_type);
    data.set("scope", config.scope);

    return this.http.post<RegisterToken>(URLS.ClientToken, data).pipe(
      tap(response => {
        localStorage.setItem(STORAGE.RegisterToken, response.access_token);
        this.RegisterToken = response.access_token;
      }),
      catchError(error => this.ui.HandleErrors(error))
    );
  }

  /**
   *  check if  access token is valid
   * @returns boolean
   */
  private checkTokenIsValid(): boolean {
    const token = localStorage.getItem(STORAGE.Token);

    if (token === null || token.length <= 0) {
      return false;
    }
    const jwt = jwt_decode(token);
    if (jwt.exp === undefined) {
      return false;
    }
    const date = new Date();
    const tokenExpDate = date.setUTCSeconds(jwt.exp);

    if (date.valueOf() > new Date().valueOf()) {
      return true;
    }
    return false;
  }

  /**
   *
   */
  private doAuthenticate(
    PhoneNumber = this.phoneNumber,
    RegToken = this.RegisterToken
  ) {
    return this.http.post<ResponseProvider<SignInResponse>>(
      URLS.SignUp,
      { phone_number: PhoneNumber },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + RegToken
        })
      }
    );
  }

  /**
   *  redirect member to create profile or to home page depend on his status
   */
  private redirectUser(data: user) {
    if (data.user_status === UserStatus.OldMember) {
      const member = data as OldMember;
      this.SaveToken(member.token);
      localStorage.setItem(STORAGE.Profile, JSON.stringify(member.profile));
      this.LoggedOut.next(false);
      this.router.navigate(["/home"], { replaceUrl: true });
    }
    if (data.user_status === UserStatus.NewMember) {
      this.newMember = data as NewMember;
      localStorage.setItem(STORAGE.NewMember, JSON.stringify(data));
      this.router.navigate(["/users/create/"], { replaceUrl: true });
    }
  }
  /**
   *  clear authentication data from storage
   */
  private clearStorage(keys: string[]) {
    if (keys.length) {
      keys.forEach(key => localStorage.removeItem(key));
    } else {
      localStorage.clear();
    }
  }

  //#endregion

  //#region get methods
  /**
   * @returns string  access token
   */
  get GetToken(): null | string {
    if (this.checkTokenIsValid()) {
      console.log(localStorage.getItem(STORAGE.Token));

      return localStorage.getItem(STORAGE.Token);
    }
    return null;
  }
  /**
   * @returns  phone number
   */
  get GetPhoneNumber() {
    return this.phoneNumber;
  }

  /**
   * @returns  new member data
   */
  get GetNewMember() {
    return this.newMember;
  }
  /**
   * @return boolean  is user authenticated or not
   */
  get isAuthenticated() {
    return this.Authenticated;
  }
  /**
   *  check if user has a token or register token
   * @returns boolean
   */
  get isRegisteredUser() {
    return isDefined(this.RegisterToken) && isDefined(this.newMember);
  }

  //#endregion

  /**
   * @returns string  register token
   */
  _GetRegisterToken() {
    return this.RegisterToken;
  }

  /**
   *  do sign in or sign up by phone number
   * @param phoneNumber  phone number
   */
  doSignInOrSignUp(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
    this.getRegisterToken()
      .pipe(
        mergeMap((res: string | RegisterToken) => this.doAuthenticate()),
        catchError(error => this.ui.HandleErrors(error))
      )
      .subscribe(res => {
        this.Username = res["data"]["username"];
        this.router.navigate(["/auth/verification"], {
          skipLocationChange: true
        });
      });
  }

  /**
   * resend otp code
   */
  resendCode() {
    return this.http
      .post<ResponseProvider<string>>(
        URLS.Resend,
        {
          username: this.Username,
          phone_number: this.phoneNumber
        },
        {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.RegisterToken
          })
        }
      )
      .pipe(catchError(error => this.ui.HandleErrors(error)));
  }

  /**
   *  check if otp is valid
   * @param verificationCode string  opt code
   */
  validateOTP(verificationCode: string) {
    return this.http
      .post<ResponseProvider<user>>(
        URLS.verify,
        {
          username: this.Username.toString(),
          phone_number: this.phoneNumber.toString(),
          code: verificationCode
        },
        {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.RegisterToken
          })
        }
      )
      .pipe(
        catchError(error => this.ui.HandleErrors(error)),
        tap(res => this.redirectUser(res.data))
      );
  }

  /**
   * save jwt to storage
   * @param token string json web token
   */
  SaveToken(token: Token) {
    localStorage.setItem(STORAGE.Token, token.accessToken);
    localStorage.setItem(STORAGE.RefreshToken, token.refreshToken);
  }

  /**
   * log out
   */
  logOut() {
    this.clearStorage([STORAGE.Profile, STORAGE.Token, STORAGE.Token]);
    this.router.navigate(["/auth"], { replaceUrl: true });
  }

  ngOnDestroy() {
    if (this.LogOutTimer) {
      clearTimeout(this.LogOutTimer);
    }
  }
}
