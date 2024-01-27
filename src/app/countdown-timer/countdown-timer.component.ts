import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CountdownTimerService } from './countdown-timer.service';
import { BehaviorSubject, of } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.scss',
})
export class CountdownTimerComponent implements AfterViewInit, OnDestroy {
  @Input() startMinute?: number = 10;
  @ViewChild('audioPlayer') audioPlayer: ElementRef | undefined;
  isBreaking = new BehaviorSubject(false);

  constructor(private countdownTimerService: CountdownTimerService) {}
  ngAfterViewInit() {
    this.countdownTimerService.setAudioPlayer(this.audioPlayer);
  }

  ngOnDestroy() {
    this.countdownTimerService.destroyTimer();
  }

  get parsedTimer() {
    return this.countdownTimerService.getParsedTime;
  }

  toggleBreaking(value: boolean) {
    this.isBreaking.next(value);
  }
}
