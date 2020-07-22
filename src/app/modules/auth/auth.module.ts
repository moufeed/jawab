import { NgModule } from "@angular/core";

import { CoreModule } from "../../core/core.module";
import { SignInComponent } from "./containers/sign-in/sign-in.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./containers/auth/auth.component";
import { SharedModule } from "src/app/Shared/shared.module";
import { VerificationComponent } from "./containers/verification/verification.component";
const components = [SignInComponent, AuthComponent, VerificationComponent];

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "sing-in"
      },
      {
        path: "sing-in",
        component: SignInComponent
      },
      {
        path: "verification",
        component: VerificationComponent
      }
    ]
  }
];

@NgModule({
  declarations: components,
  imports: [CoreModule, SharedModule, RouterModule.forChild(routes)],
  exports: [...components, RouterModule]
})
export class AuthModule {}
