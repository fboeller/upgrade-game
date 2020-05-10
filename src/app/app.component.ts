import { Component, OnInit } from '@angular/core';
import { Observable, merge, BehaviorSubject, Subject } from 'rxjs';
import {
  mapTo,
  scan,
  startWith,
  map,
  filter,
  first,
  shareReplay,
  skipUntil,
} from 'rxjs/operators';
import { Upgrade } from './upgrade';
import { Store, select } from '@ngrx/store';
import { AppState } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [],
})
export class AppComponent implements OnInit {
  title = 'upgrade-game';

  constructor(private store: Store<AppState>) {}

  funds$: Observable<number>;
  timeControlPanelVisible$: Observable<boolean>;

  ngOnInit() {
    this.funds$ = this.store.pipe(select('gameState'), select('funds'));
    this.timeControlPanelVisible$ = this.store.pipe(
      select('gameState'),
      select('timeActive'),
      filter(timeActive => timeActive),
      first(),
      startWith(false)
    );
  }
}
