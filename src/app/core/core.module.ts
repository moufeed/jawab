import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { NgxMaskModule } from "ngx-mask";
const Modules = [
  CommonModule,
  TranslateModule,
  FormsModule,
  MaterialModule,
  NgxMaskModule
];

@NgModule({
  declarations: [],
  imports: Modules,
  exports: Modules
})
export class CoreModule {}
