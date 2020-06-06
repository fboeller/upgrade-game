import { Component, OnInit, Input } from '@angular/core';
import {
  Property,
  personalProperties,
  businessProperties,
} from 'types/property.type';
import { Boost } from 'types/boost.type';
import { Upgrade } from 'types/upgrade.type';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
})
export class GamePanelComponent implements OnInit {
  personalProperties = personalProperties;
  businessProperties = businessProperties;

  @Input() funds: number;
  @Input() upgrades: Upgrade[];
  @Input() availablePersonalProperties: Property[];
  @Input() availableBusinessProperties: Property[];
  @Input() timeActive: boolean;
  @Input() activeBoosts: { [boost: string]: number };
  @Input() boosts: Boost[];

  visibleFundsEffect: number;

  constructor() {}

  ngOnInit() {}
}
