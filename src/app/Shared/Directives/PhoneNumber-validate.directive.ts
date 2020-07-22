import { Directive, Input } from "@angular/core";
import {
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS
} from "@angular/forms";
import { PhoneValidate } from "src/app/core/validators/PhonNumber.validator";

@Directive({
  selector: "[PhoneValidate][ngModel]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhoneValidateDirective,
      multi: true
    }
  ]
})
export class PhoneValidateDirective implements Validator {
  @Input() PhoneValidate;
  validate(control: AbstractControl): ValidationErrors | null {
    return PhoneValidate(this.PhoneValidate)(control);
  }
}
