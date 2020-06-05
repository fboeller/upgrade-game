import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.styl'],
})
export class ProgressBarComponent implements OnInit {
  @Input() active: Boolean;

  constructor() {}

  ngOnInit(): void {}
}
