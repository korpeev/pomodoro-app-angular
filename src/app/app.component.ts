import {
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  map,
  of,
  Subject,
  Subscription,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { CountdownTimerModule } from './countdown-timer/countdown-timer.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, DatePipe, CountdownTimerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
