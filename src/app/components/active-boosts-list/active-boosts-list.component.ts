import { Component, Input, OnChanges } from '@angular/core';
import { Boost, boostMap } from 'types/boost.type';
import { keys, flow, filter } from 'lodash/fp';

@Component({
  selector: 'app-active-boosts-list',
  templateUrl: './active-boosts-list.component.html',
  styleUrls: ['./active-boosts-list.component.styl'],
})
export class ActiveBoostsListComponent implements OnChanges {
  @Input() activeBoosts: { [boost: string]: number };

  boostKeys: Boost[];
  boostMap = boostMap;

  constructor() {}

  ngOnChanges() {
    this.boostKeys = flow([
      keys,
      filter((boost: Boost) => this.activeBoosts[boost] > 0),
    ])(this.activeBoosts) as Boost[];
  }
}
