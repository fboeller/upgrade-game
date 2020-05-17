import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'actions/game.actions';
import {
  filterBecameAffordable,
  selectGameState,
} from 'selectors/game.selectors';
import {
  Property,
  personalProperties,
  businessProperties,
} from 'types/property.type';
import { powerups } from 'types/powerup.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  funds$: Observable<number>;
  visibleFundsEffect: number;
  becameAffordablePersonalProperties$: Observable<Property[]>;
  becameAffordableBusinessProperties$: Observable<Property[]>;
  timeActive$: Observable<boolean>;
  achievements$: Observable<string[]>;
  powerups = powerups;

  ngOnInit() {
    this.funds$ = this.store.pipe(select('gameState', 'funds'));
    this.becameAffordablePersonalProperties$ = this.store.pipe(
      select(filterBecameAffordable, { properties: personalProperties })
    );
    this.becameAffordableBusinessProperties$ = this.store.pipe(
      select(filterBecameAffordable, { properties: businessProperties })
    );
    this.timeActive$ = this.store.pipe(select('gameState', 'timeActive'));
    this.achievements$ = this.store.pipe(
      select(selectGameState),
      map((state) => state.achievements)
    );
  }
}
