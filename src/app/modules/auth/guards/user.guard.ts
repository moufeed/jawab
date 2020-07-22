import { CanLoad, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Injectable({ providedIn: "root" })
export class UserGuard implements CanLoad {
  /**
   *
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.authService.isAuthenticated ||
      this.authService.isRegisteredUser
    ) {
      return true;
    }
    this.router.navigate(["/auth"]);
    return false;
  }
}
