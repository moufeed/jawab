import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import VanillaTilt from "vanilla-tilt";
import { mergeMap } from "rxjs/operators";

import { UsersService } from "src/app/modules/users/services/users.service";
import { ResponseProvider } from "src/app/core/Interfaces/http-response.interface";
import { UploadResponse } from "src/app/core/Interfaces/Upload-response.interface";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit, AfterViewInit {
  @ViewChild("avatar", { static: false }) avatar: ElementRef;

  isLoading = false;
  private src = "assets/img/avatar.svg";
  private selectedFile: File = null;
  ImgSrc: any = this.src;
  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    VanillaTilt.init(this.avatar.nativeElement, {
      scale: 1.07
    });
  }
  ChangeFile(file: File) {
    if (!file) {
      this.selectedFile = null;
      this.ImgSrc = this.src;
      return;
    }
    this.selectedFile = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => (this.ImgSrc = reader.result);
  }



  onSubmit({ full_name }) {
    if (this.selectedFile !== null) {
      const data = new FormData();
      data.append("files", this.selectedFile, this.selectedFile.name);
      this.usersService
        .UploadImage(data)
        .pipe(
          mergeMap((res: ResponseProvider<UploadResponse>) => {
            console.log(res);
            return this.usersService.CreateProfile(
              res.data.urls[0]["url"],
              full_name
            );
          })
        )
        .subscribe(res => {
          this.usersService.ProcessUserResponse(res);
        });
    } else {
      this.usersService
        .CreateProfile("", full_name)
        .subscribe(res => this.usersService.ProcessUserResponse(res));
    }
  }
}
