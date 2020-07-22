import { Subject, BehaviorSubject, timer } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class Timer {
  minutes: number = 5;
  seconds: number = 0;
  totalSeconds = 0;
  timer$ = new Subject<{ m: number; s: number }>();
  counterSource = new BehaviorSubject<{ m: number; s: number }>({
    m: 0,
    s: 0
  });

  /**
   *
   */
  constructor() {}

  start() {
    this.totalSeconds += this.minutes ? this.minutes * 60 : 0;
    this.totalSeconds += this.seconds ? this.seconds : 0;
    return this.counterSource
      .pipe(
        switchMap(obj => {
          return timer(0, 1000).pipe(
            tap(time => {
              const minute = Math.floor((this.totalSeconds - time) / 60);
              const second = (this.totalSeconds - time) % 60;
              if (minute >= 0 && second >= 0) {
                this.timer$.next({
                  m: minute,
                  s: second
                });
              }
            })
          );
        })
      )
      .subscribe();
  }

  restart() {
    return this.counterSource.next({ m: this.minutes, s: this.seconds });
  }

  complete() {
    return this.timer$.complete();
  }
}
