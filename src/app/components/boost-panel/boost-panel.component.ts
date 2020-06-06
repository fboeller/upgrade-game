import { Component, OnInit, Input } from '@angular/core';
import { Boost } from 'types/boost.type';

@Component({
  selector: 'app-boost-panel',
  templateUrl: './boost-panel.component.html',
})
export class BoostPanelComponent implements OnInit {
  constructor() {}

  @Input() boosts: Boost[];

  ngOnInit() {}
}
