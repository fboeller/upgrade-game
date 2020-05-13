import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, filter, first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from './actions/game.actions';
import { filterBecameAffordable } from './selectors/game.selectors';
import { Property } from './property.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [],
})
export class AppComponent implements OnInit {
  title = 'upgrade-game';

  constructor(private store: Store<AppState>) {}

  personalProperties: Property[] = ['education', 'salary', 'workEfficiency'];
  businessProperties: Property[] = ['businessIncome'];

  funds$: Observable<number>;
  timeControlPanelVisible$: Observable<boolean>;
  becameAffordablePersonalProperties$: Observable<Property[]>;
  becameAffordableBusinessProperties$: Observable<Property[]>;

  ngOnInit() {
    this.funds$ = this.store.pipe(select('gameState', 'funds'));
    this.timeControlPanelVisible$ = this.store.pipe(
      select('gameState', 'timeActive'),
      filter((timeActive) => timeActive),
      first(),
      startWith(false)
    );
    this.becameAffordablePersonalProperties$ = this.store.pipe(select(filterBecameAffordable, { properties: this.personalProperties }));
    this.becameAffordableBusinessProperties$ = this.store.pipe(select(filterBecameAffordable, { properties: this.businessProperties }));
  }
}
