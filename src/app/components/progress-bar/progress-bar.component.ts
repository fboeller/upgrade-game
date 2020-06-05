import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.styl'],
})
export class ProgressBarComponent {
  @Input() active: boolean;
  @Input() duration: number;

  constructor() {}
}
