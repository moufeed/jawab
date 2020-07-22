import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "src/environments/environment";

import * as fromUsers from "src/app/modules/users/store";

export interface State {
  userState: fromUsers.State;
}

export const reducers: ActionReducerMap<State> = {
  userState: fromUsers.UserReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const getUserState = createFeatureSelector<fromUsers.State>("userStat");
export const getUserProfile = createSelector(
  getUserState,
  fromUsers.getProfile
);
