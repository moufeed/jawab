import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { URLS, FileTypeEnum, STORAGE } from "src/app/Shared/constants";
import { ResponseProvider, UploadResponse } from "src/app/core/Interfaces";

import { AuthService } from "src/app/modules/auth/services/auth.service";
import { UiHelper } from "src/app/Shared/ui/UiHelper.services";
import { NewMember } from "src/app/modules/auth/Interfaces/Member.interface";
import { Profile } from "../interfaces/profile.interface";
import { Token } from "src/app/modules/auth/Interfaces/token.interface";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { isDefined } from "src/app/core/helpers/Utilities";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class UsersService {
  private RegisterToken: string | null;


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private ui: UiHelper,
    private router: Router,
  ) {
    this.RegisterToken = this.authService._GetRegisterToken();
  }

   getProfileFromStorage() {
    const profile = localStorage.getItem(STORAGE.Profile);
    if (isDefined(profile)) {
      return JSON.parse(profile);
    }
    return {};
  }

  /**
   *
   * @param form FormData
   */
  UploadImage(form: FormData) {
    return this.http
      .post<ResponseProvider<UploadResponse>>(
        `${URLS.upload}${FileTypeEnum.Avatar}`,
        form,
        {
          headers: new HttpHeaders({
            Authorization: "Bearer " + this.RegisterToken
          })
        }
      )
      .pipe(catchError(error => this.ui.HandleErrors(error)));
  }

  /**
   *  Create Profile
   * @param avatarUrl  string  avatar image url
   * @param fullName string   full name of  member
   */
  CreateProfile(avatarUrl: string, fullName: string) {
    const memberData: NewMember = this.authService.GetNewMember;
    const data = {
      username: memberData.username,
      user_id: memberData.user_id,
      security_code: memberData.security_code,
      full_name: fullName,
      avatar: avatarUrl
    };
    return this.http
      .post<ResponseProvider<{ profile: Profile; token: Token }>>(
        `${URLS.addProfile}`,
        data,
        {
          headers: new HttpHeaders({
            Authorization: "Bearer " + this.RegisterToken
          })
        }
      )
      .pipe(catchError(error => this.ui.HandleErrors(error)));
  }

  SaveProfile(profile: Profile) {
    localStorage.setItem(STORAGE.Profile, JSON.stringify(profile));
  }

  private SaveResponse(
    response: ResponseProvider<{ profile: Profile; token: Token }>
  ) {
    this.SaveProfile(response.data.profile);
    this.authService.SaveToken(response.data.token);
  }

  ProcessUserResponse(
    response: ResponseProvider<{ profile: Profile; token: Token }>
  ) {
    this.SaveResponse(response);
    this.authService.LoggedOut.next(false);
    this.router.navigate(["/home"], { replaceUrl: true });
  }
}
