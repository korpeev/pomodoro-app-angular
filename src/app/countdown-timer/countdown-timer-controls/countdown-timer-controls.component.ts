import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountdownTimerService } from '../countdown-timer.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-countdown-timer-controls',
  standalone: true,
  imports: [AsyncPipe, NgForOf, FormsModule],
  templateUrl: './countdown-timer-controls.component.html',
  styleUrl: './countdown-timer-controls.component.scss',
})
export class CountdownTimerControlsComponent implements OnInit {
  @Output() toggleBreakTime = new EventEmitter<boolean>();
  @Input({ required: true }) isBreaking!: BehaviorSubject<boolean>;
  startMinutesOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 59];
  selectedStartMinute = new BehaviorSubject(10);
  breakTimeOptions = [5, 10, 15, 20, 25, 30];
  selectedBreakTime = new BehaviorSubject(5);
  constructor(private countdownService: CountdownTimerService) {}

  ngOnInit() {
    if (this.isBreaking.value) {
      this.countdownService.setStartMinute(this.selectedBreakTime.value);
    } else {
      this.countdownService.setStartMinute(this.selectedStartMinute.value);
    }
  }

  public startMinuteSelectHandler(value: number) {
    this.selectedStartMinute.next(value);
    this.countdownService.setStartMinute(value);
  }

  public breakTimeSelectHandler(value: number) {
    this.selectedBreakTime.next(value);
    this.countdownService.setStartMinute(value);
  }

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
    this.toggleBreakTime.emit(!this.isBreaking.value);
    this.stopTimer();
    this.restartTimer();
    if (this.isBreaking.value) {
      this.countdownService.setStartMinute(this.selectedBreakTime.value);
      this.countdownService.setSeconds(0);
    } else {
      this.countdownService.setStartMinute(this.selectedStartMinute.value);
      this.countdownService.setSeconds(0);
    }
  }
}
