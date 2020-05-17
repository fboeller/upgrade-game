import { Component, OnInit, Input } from '@angular/core';
import { Property, personalProperties, businessProperties } from 'types/property.type';
import { Powerup } from 'types/powerup.type';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.styl']
})
export class GamePanelComponent implements OnInit {

  personalProperties = personalProperties;
  businessProperties = businessProperties;

  @Input() funds: number;
  @Input() becameAffordablePersonalProperties: Property[];
  @Input() becameAffordableBusinessProperties: Property[];
  @Input() timeActive: boolean;
  @Input() powerups: Powerup[];

  visibleFundsEffect: number;

  constructor() { }

  ngOnInit() {
  }

}
