import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { Timer } from "src/app/core/helpers/Timer.helper";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-verification",
  templateUrl: "./verification.component.html",
  styleUrls: ["./verification.component.scss"]
})
export class VerificationComponent implements OnInit, OnDestroy {
  isLoading = false;

  private subscription = Subscription.EMPTY;
  timer$ = new Observable<{ m: number; s: number }>();
  phoneNumber;
  constructor(private timer: Timer, private authService: AuthService) {
    this.subscription = this.timer.start();
    this.timer$ = this.timer.timer$.asObservable();
  }

  ngOnInit() {
    const num = this.authService.GetPhoneNumber;
    this.phoneNumber =
      num != "undefined"
        ? num.substr(0, 2) + "••••••••" + num.substr(-2)
        : "••••••••";
  }
  onSubmit({ code }) {

    this.isLoading = true;
    this.authService.validateOTP(code).subscribe(res=> {
      this.isLoading = false;
    });
  }
  resendCode() {
    this.isLoading = true;
    this.authService.resendCode().subscribe(e => (this.isLoading = false));
    this.timer.restart();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
