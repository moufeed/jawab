import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoreModule } from "src/app/core/core.module";
import { SharedModule } from "src/app/Shared/shared.module";

import { UsersComponent } from "./containers/users/users.component";
import { CreateComponent } from "./containers/create/create.component";


const components = [UsersComponent, CreateComponent];
const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "create"
      },
      {
        path: "create",
        component: CreateComponent
      }
    ]
  }
];

@NgModule({
  declarations: components,
  imports: [CoreModule, SharedModule, RouterModule.forChild(routes)],
  exports: [...components, RouterModule]
})
export class UsersModule {}
