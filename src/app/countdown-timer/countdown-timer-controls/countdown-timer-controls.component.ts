import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CountdownTimerService } from '../countdown-timer.service';

@Component({
  selector: 'app-countdown-timer-controls',
  standalone: true,
  imports: [],
  templateUrl: './countdown-timer-controls.component.html',
  styleUrl: './countdown-timer-controls.component.scss',
})
export class CountdownTimerControlsComponent {
  @Output() toggleBreakTime = new EventEmitter<void>();
  @Input({ required: true }) isBreaking!: boolean;

  constructor(private countdownService: CountdownTimerService) {}

  public startTimer() {
    this.countdownService.startTimer();
  }

  public stopTimer() {
    this.countdownService.stopTimer();
  }

  public restartTimer() {
    this.countdownService.restartTimer();
  }

  public onToggleBreaking() {
    this.toggleBreakTime.emit();
    if (!this.isBreaking) {
      this.stopTimer();
      this.countdownService.setStartMinute(5);
      this.countdownService.setSeconds(59);
    } else {
      this.countdownService.setStartMinute(9);
      this.countdownService.setSeconds(59);
    }
  }
}
