import { Component, OnInit, Input } from '@angular/core';
import { boostMap, Boost } from 'types/boost.type';
import { AppState, activateBoost } from 'src/app/game.actions';
import { Store } from '@ngrx/store';
import { propertyTypes } from 'types/property-type.type';

@Component({
  selector: 'app-boost-card',
  templateUrl: './boost-card.component.html',
})
export class BoostCardComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  @Input() boost: Boost;

  objectKeys = Object.keys;
  boostMap = boostMap;
  propertyTypes = propertyTypes;

  ngOnInit() {}

  buy() {
    this.store.dispatch(activateBoost({ boost: this.boost }));
  }
}
