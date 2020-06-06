import { Component, Input, OnChanges } from '@angular/core';
import { Powerup, powerupMap } from 'types/powerup.type';
import { keys, flow, filter } from 'lodash/fp';

@Component({
  selector: 'app-active-boosts-list',
  templateUrl: './active-boosts-list.component.html',
  styleUrls: ['./active-boosts-list.component.styl'],
})
export class ActiveBoostsListComponent implements OnChanges {
  @Input() activeBoosts: { [powerup: string]: number };

  boostKeys: Powerup[];
  powerupMap = powerupMap;

  constructor() {}

  ngOnChanges() {
    this.boostKeys = flow([
      keys,
      filter((boost: Powerup) => this.activeBoosts[boost] > 0),
    ])(this.activeBoosts) as Powerup[];
  }
}
