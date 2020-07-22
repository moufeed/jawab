import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from "@angular/core";
import VanillaTilt from "vanilla-tilt";
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit, AfterViewInit {
  constructor() {}
  @ViewChild("logo", { static: false }) logo: ElementRef;

  ngOnInit() {}
  ngAfterViewInit() {
    VanillaTilt.init(this.logo.nativeElement, {
      scale: 1.1
    });
  }
}
