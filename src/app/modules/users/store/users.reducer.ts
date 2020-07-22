import { Profile } from "../interfaces/profile.interface";

import { UserAction, UserActions } from "./users.actions";

export interface State {
  userProfile: Profile;
}
const initialState: State = {
  userProfile: {}
};

export function UserReducer(state = initialState, action: UserAction) {
  switch (action.type) {
    case UserActions.CREATE_PROFILE:
      return {
        ...state,
        userProfile : action.payload
      };
    case UserActions.EDIT_PROFILE:
      return {
        ...state,
        userProfile: { ...state.userProfile, ...action.payload }
      };
      case UserActions.SET_PROFILE:
        return {
          ...state,
          userProfile: action.payload
        };
    default:
      return state;
  }
}

export const getProfile = (state: State) => state.userProfile;
