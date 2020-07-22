import { Token } from "./token.interface";
import { Profile } from "src/app/modules/users/interfaces/profile.interface";


export interface OldMember {
  user_status: number;
  profile: Profile;
  token: Token;
}

export interface NewMember {
  security_code: string;
  user_id: string;
  username: string;
  user_status: number;
}

export enum UserStatus {
  OldMember = 1,
  NewMember = 2
}

export type user  = OldMember | NewMember;
