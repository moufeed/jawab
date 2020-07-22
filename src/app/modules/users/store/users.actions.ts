import { Action } from "@ngrx/store";
import { Profile } from "../interfaces/profile.interface";

export enum UserActions {
  CREATE_PROFILE = "[Users] Create user profile",
  EDIT_PROFILE = "[Users] Edit user profile",
  SET_PROFILE = "[Users] Set profile"
}
export class CreateProfile implements Action {
  readonly type = UserActions.CREATE_PROFILE;

  constructor(public payload: Profile) {}
}

export class EditProfile implements Action {
  readonly type = UserActions.EDIT_PROFILE;
  constructor(public payload: Partial<Profile>) {}
}

export class SetProfile implements Action {
  readonly type = UserActions.SET_PROFILE;
  constructor(public payload: Profile) {}
}

export type UserAction = CreateProfile | EditProfile | SetProfile;
