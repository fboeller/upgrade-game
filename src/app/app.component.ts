import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/game.actions';
import { Selectors, selectGameState } from 'selectors/game.selectors';
import { Property } from 'types/property.type';
import { boosts } from 'types/boost.type';
import { Upgrade } from 'types/upgrade.type';
import { selectBoosts } from 'selectors/boost.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  funds$: Observable<number>;
  visibleFundsEffect: number;
  upgrades$: Observable<Upgrade[]>;
  availablePersonalProperties$: Observable<Property[]>;
  availableBusinessProperties$: Observable<Property[]>;
  timeActive$: Observable<boolean>;
  achievements$: Observable<string[]>;
  activeBoosts$: Observable<{ [boost: string]: number }>;
  boosts = boosts;

  ngOnInit() {
    this.funds$ = this.store.pipe(select('gameState', 'funds'));
    this.upgrades$ = this.store.pipe(select(Selectors.possibleUpgrades));
    this.availablePersonalProperties$ = this.store.pipe(
      select(selectGameState),
      select(Selectors.availablePersonalProperties)
    );
    this.availableBusinessProperties$ = this.store.pipe(
      select(selectGameState),
      select(Selectors.availableBusinessProperties)
    );
    this.timeActive$ = this.store.pipe(select('gameState', 'timeActive'));
    this.achievements$ = this.store.pipe(
      select(selectGameState),
      map((state) => state.achievements)
    );
    this.activeBoosts$ = this.store.pipe(
      select(selectGameState),
      select(selectBoosts)
    );
  }
}
