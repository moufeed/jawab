import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function PhoneValidate(regex: RegExp | null): ValidatorFn {
  const REGEX =
    regex && regex instanceof RegExp ? regex : /^(\+|00)+([\d]{11,13})$/;

  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.match(REGEX) === null) {
      return { phoneNumberInvalid: true };
    }
    return null;
  };
}
