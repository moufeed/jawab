import { environment } from "src/environments/environment";

export const URLS = {
  ClientToken: `${environment.authConfig.url}/connect/token`,
  SignUp: `${environment.authConfig.url}/api/Account/Signup`,
  verify: `${environment.authConfig.url}/api/Account/VerifyPhoneNumber`,
  Resend: `${environment.authConfig.url}/api/Account/SendCodeToPhoneNumber`,
  upload: `${environment.authConfig.url}/api/File/Upload/`,
  addProfile: `${environment.authConfig.url}/api/Account/Profile`
};
