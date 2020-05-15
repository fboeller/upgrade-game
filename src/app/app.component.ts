import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, filter, first, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from './actions/game.actions';
import {
  filterBecameAffordable,
  selectGameState,
} from './selectors/game.selectors';
import { Property } from './types/property.type';
import { Achievement } from './types/achievement.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  personalProperties: Property[] = ['education', 'salary', 'workEfficiency'];
  businessProperties: Property[] = ['businessIncome'];

  funds$: Observable<number>;
  visibleFundsEffect: number;
  becameAffordablePersonalProperties$: Observable<Property[]>;
  becameAffordableBusinessProperties$: Observable<Property[]>;
  achievements$: Observable<Achievement[]>;
  timeActive$: Observable<boolean>;

  ngOnInit() {
    this.funds$ = this.store.pipe(select('gameState', 'funds'));
    this.becameAffordablePersonalProperties$ = this.store.pipe(
      select(filterBecameAffordable, { properties: this.personalProperties })
    );
    this.becameAffordableBusinessProperties$ = this.store.pipe(
      select(filterBecameAffordable, { properties: this.businessProperties })
    );
    this.achievements$ = this.store.pipe(
      select(selectGameState),
      map((state) => state.achievements)
    );
    this.timeActive$ = this.store.pipe(select('gameState', 'timeActive'));
  }
}
