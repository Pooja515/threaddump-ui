import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-stats',
standalone: true,
imports: [CommonModule],
templateUrl: './stats.html',
styleUrl: './stats.css',
})
export class StatsComponent {
@Input() totalThreads: number = 0;
@Input() running: number = 0;
@Input() blocked: number = 0;
@Input() waiting: number = 0;
@Input() timedWaiting: number = 0;
@Input() deadlocked: number = 0;

@Input() selected: string = 'ALL'; // ✅ NEW

@Output() stateSelected = new EventEmitter<string>();

selectState(state: string) {
    this.stateSelected.emit(state);
  }
}
