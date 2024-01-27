import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { combineLatestWith, takeUntil } from 'rxjs';
import { CountdownTimerService } from '../countdown-timer.service';

@Component({
  selector: 'app-countdown-timer-circle-progress',
  standalone: true,
  imports: [],
  templateUrl: './countdown-timer-circle-progress.component.html',
})
export class CountdownTimerCircleProgressComponent implements AfterViewInit {
  @ViewChild('innerCircle') innerCircle?: ElementRef;
  dashOffset = 2 * Math.PI * 40;

  constructor(private countdownTimerService: CountdownTimerService) {}

  ngAfterViewInit() {
    this.countdownTimerService.$startMinute
      .pipe(
        takeUntil(this.countdownTimerService.$timerDestroy),
        combineLatestWith(this.countdownTimerService.$seconds),
      )
      .subscribe(([minute, second]) => {
        const parsedMinute = (minute === 0 ? 1 : minute * 60) + second;
        const percent =
          (this.countdownTimerService.$elapsedSeconds.value / parsedMinute) *
          100;
        const offsetValue = this.dashOffset * ((100 - percent) / 100);
        this.innerCircle?.nativeElement?.setAttribute(
          'stroke-dashoffset',
          `${offsetValue}px`,
        );
      });

    this.innerCircle?.nativeElement?.setAttribute(
      'stroke-dasharray',
      `${this.dashOffset}px`,
    );
  }
}
