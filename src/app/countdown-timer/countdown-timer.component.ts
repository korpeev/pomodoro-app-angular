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

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.scss',
})
export class CountdownTimerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() startMinute?: number = 10;
  @ViewChild('audioPlayer') audioPlayer: ElementRef | undefined;
  isBreaking = false;

  constructor(private countdownTimerService: CountdownTimerService) {}
  ngAfterViewInit() {
    this.countdownTimerService.setAudioPlayer(this.audioPlayer);
  }

  ngOnInit() {
    this.countdownTimerService.setStartMinute(this.startMinute ?? 10);
  }
  ngOnDestroy() {
    this.countdownTimerService.destroyTimer();
  }

  get parsedTimer() {
    return this.countdownTimerService.getParsedTime;
  }

  toggleBreaking() {
    this.isBreaking = !this.isBreaking;
  }
}
