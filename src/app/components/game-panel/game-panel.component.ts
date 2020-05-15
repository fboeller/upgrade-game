import { Component, OnInit, Input } from '@angular/core';
import { Property, personalProperties, businessProperties } from 'src/app/types/property.type';

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

  visibleFundsEffect: number;

  constructor() { }

  ngOnInit() {
  }

}
