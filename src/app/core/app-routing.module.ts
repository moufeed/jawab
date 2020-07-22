import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotfoundComponent } from "../shared/containers/notfound/notfound.component";
import { AuthGuard } from "../modules/auth/guards/auth.guard";
import { UserGuard } from "../modules/auth/guards/user.guard";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("../modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "home",
    canLoad: [AuthGuard],
    loadChildren: () =>
      import("../modules/pages/pages.module").then(m => m.PagesModule)
  },
  {
    path: "users",
    canLoad: [UserGuard],
    loadChildren: () =>
      import("../modules/users/users.module").then(m => m.UsersModule)
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "404", component: NotfoundComponent },
  { path: "**", redirectTo: "/404", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
