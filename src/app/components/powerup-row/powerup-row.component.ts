import { Component, OnInit, Input } from '@angular/core';
import { powerupMap, Powerup } from 'types/powerup.type';
import { AppState, activatePowerup } from 'actions/game.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-powerup-row',
  templateUrl: './powerup-row.component.html',
})
export class PowerupRowComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  @Input() powerup: Powerup;

  powerupMap = powerupMap;

  ngOnInit() {}

  buy() {
    this.store.dispatch(activatePowerup({ powerup: this.powerup }));
  }
}
