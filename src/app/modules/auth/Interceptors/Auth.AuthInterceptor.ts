import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private authService: AuthService) {}

  intercept(requset: HttpRequest<any>, next: HttpHandler) {
    const token: null | string = this.authService.GetToken;
    if (token !== null) {
      requset = requset.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(requset);
  }
}
