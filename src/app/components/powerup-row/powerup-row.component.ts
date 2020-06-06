import { Component, OnInit, Input } from '@angular/core';
import { powerupMap, Powerup } from 'types/powerup.type';
import { AppState, activatePowerup } from 'src/app/game.actions';
import { Store } from '@ngrx/store';
import { propertyTypes } from 'types/property-type.type';

@Component({
  selector: 'app-powerup-row',
  templateUrl: './powerup-row.component.html',
})
export class PowerupRowComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  @Input() powerup: Powerup;

  objectKeys = Object.keys;
  powerupMap = powerupMap;
  propertyTypes = propertyTypes;

  ngOnInit() {}

  buy() {
    this.store.dispatch(activatePowerup({ powerup: this.powerup }));
  }
}
