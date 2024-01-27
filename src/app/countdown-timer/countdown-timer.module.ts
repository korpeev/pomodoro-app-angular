import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownTimerComponent } from './countdown-timer.component';
import { CountdownTimerService } from './countdown-timer.service';
import { CountdownTimerControlsComponent } from './countdown-timer-controls/countdown-timer-controls.component';
import { CountdownTimerCircleProgressComponent } from './countdown-timer-circle-progress/countdown-timer-circle-progress.component';

@NgModule({
  declarations: [CountdownTimerComponent],
  imports: [
    CommonModule,
    CountdownTimerControlsComponent,
    CountdownTimerCircleProgressComponent,
  ],
  exports: [CountdownTimerComponent],
  providers: [CountdownTimerService],
})
export class CountdownTimerModule {}
