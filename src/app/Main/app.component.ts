import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { environment as env } from "../../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.addLangs(env.translate.langs);
    translate.setDefaultLang(env.translate.default);
    const BrowserLang = translate.getBrowserLang();
    translate.use(
      BrowserLang.match(env.translate.match)
        ? BrowserLang
        : env.translate.default
    );
  }
}
