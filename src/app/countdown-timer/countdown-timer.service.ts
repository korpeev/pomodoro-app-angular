import { ElementRef, Inject, Injectable, ViewChild } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Subject,
  takeUntil,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownTimerService {
  private TIME_SECONDS = 0;
  private TIME_START_MINUTES = 10;
  private audioPlayer?: ElementRef;
  private $timer = timer(0, 1000);
  $seconds = new BehaviorSubject(this.TIME_SECONDS);
  $timerDestroy = new Subject();
  $startMinute = new BehaviorSubject(this.TIME_START_MINUTES);
  private $timerPaused = new BehaviorSubject(false);
  private $timerStarted = new BehaviorSubject(false);
  $elapsedSeconds = new BehaviorSubject(0);

  public setAudioPlayer(value?: ElementRef) {
    this.audioPlayer = value;
  }

  public setStartMinute(value: number) {
    this.TIME_START_MINUTES = value;
    this.$startMinute.next(this.TIME_START_MINUTES);
  }

  public setSeconds(value: number) {
    this.TIME_SECONDS = value;
    this.$seconds.next(this.TIME_SECONDS);
  }

  public get getParsedTime() {
    return combineLatest([this.$startMinute, this.$seconds]).pipe(
      map(([minute, seconds]) => {
        const date = new Date();
        date.setMinutes(minute, seconds);
        return date;
      }),
    );
  }

  public startTimer() {
    if (this.$timerStarted.value) return;
    this.$timerPaused.next(false);
    this.$timerStarted.next(true);
    this.$timer.pipe(takeUntil(this.$timerDestroy)).subscribe((value) => {
      this.$elapsedSeconds.next(value);
      const currentSecond = this.$seconds.value;
      const currentMinute = this.$startMinute.value;
      if (currentSecond === 0 && currentMinute === 0) {
        this.$elapsedSeconds.next(0);
        this.audioPlayer?.nativeElement?.play();
        this.stopTimer();
        this.resetTimer();
        return;
      }

      if (currentSecond === 0) {
        this.$seconds.next(59);
        this.$startMinute.next(currentMinute - 1);
      }

      if (!this.$timerPaused.value) {
        if (currentSecond > 0) {
          this.$seconds.next(currentSecond - 1);
        }
      }
    });
  }

  public stopTimer() {
    if (this.$timerPaused.value) return;
    this.$timerPaused.next(true);
    this.$timerStarted.next(false);
    this.$timerDestroy.next(true);
  }

  public restartTimer() {
    this.resetTimer();
  }

  public destroyTimer() {
    this.$timerDestroy.next(true);
    this.$timerDestroy.complete();
  }

  private resetTimer() {
    this.$elapsedSeconds.next(0);
    this.$timerStarted.next(false);
    this.$timerPaused.next(false);
    this.$seconds.next(this.TIME_SECONDS);
    this.$startMinute.next(this.TIME_START_MINUTES);
  }
}
