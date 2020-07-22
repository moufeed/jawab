import { NgModule } from "@angular/core";
import { PhoneValidateDirective } from "./Directives/PhoneNumber-validate.directive";


const Declarations = [PhoneValidateDirective];

@NgModule({
  declarations: Declarations,
  imports: [],
  exports: [...Declarations]
})
export class SharedModule {}
