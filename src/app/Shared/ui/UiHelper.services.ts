import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import * as utility from "../../core/helpers/Utilities";
import { MatSnackBar } from "@angular/material";
import { throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class UiHelper {
  constructor(private SnackBar: MatSnackBar) {}



   openSnackbar(message: string, action?, options?) {
    this.SnackBar.open(message, action, options);
  }

  HandleErrors(errorResponse: HttpErrorResponse) {
    const errorMessage = "[jawab] An unknown error occurred!";
    if (errorResponse.error || errorResponse.error.error) {
      const MSG = utility.ObjectToString(errorResponse.error.errors);
      this.openSnackbar(MSG, false, {
        duration: 2500
      });
      return throwError(
        `${errorResponse.status}(${errorResponse.statusText}) \n  ${MSG}`
      );
    }

    return throwError(
      `${errorResponse.status}(${errorResponse.statusText}) \n  ${errorMessage}`
    );
  }
}
