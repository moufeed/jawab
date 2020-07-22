export interface Profile {
  rate?: number;
  modified_date?: string;
  country?: string;
  nationality?: string;
  gender?: string | null;
  avatar_url?: string;
  email?: string;
  username?: string;
  phone_number?: string;
  isSeller?: boolean;
  company?: string;
  Description?: string;
  user_id?: string;
  full_name?: string;
  country_id?: string | null;
  nationality_id?: string | null;
  birthdate?: string;
  years_exp?: number;
  avatar?: string;
  address?: string;
  [key: string]: any;
}
