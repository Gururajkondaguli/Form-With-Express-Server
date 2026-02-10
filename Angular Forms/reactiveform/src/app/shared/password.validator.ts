import { AbstractControl } from "@angular/forms";

export function PasswordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  
   const password=control.get('password');
   const confirmPassword=control.get('confirmPassword');

  // safety check
  if (!password || !confirmPassword) {
    return null;
  }

  // don't validate until user touches fields
  if (password.pristine || confirmPassword.pristine) {
    return null;
  }



   return password && confirmPassword && password.value!=confirmPassword.value?
   {['mismatch']:true}:null;
}
