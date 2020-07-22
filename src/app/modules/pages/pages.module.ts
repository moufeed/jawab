import { NgModule } from "@angular/core";

import { HomeComponent } from "./containers/home/home.component";
import { Route, RouterModule } from "@angular/router";
import { SidebarComponent } from "./partials/sidebar/sidebar.component";
import { QuestionsComponent } from "./containers/questions/questions.component";
import { AnswersComponent } from "./containers/answers/answers.component";
import { SharedModule } from 'src/app/Shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

const components = [
  HomeComponent,
  SidebarComponent,
  QuestionsComponent,
  AnswersComponent
];

const routes: Route[] = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "questions"
      },
      {
        path: "questions",
        component: QuestionsComponent
      },
      {
        path: "answers",
        component: AnswersComponent
      }
    ]
  }
];
@NgModule({
  declarations: [...components],
  imports: [RouterModule.forChild(routes) ,SharedModule, CoreModule],
  exports: [...components]
})
export class PagesModule {}
