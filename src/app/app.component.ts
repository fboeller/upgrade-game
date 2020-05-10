import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, filter, first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from './actions/game.actions';

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
    this.funds$ = this.store.pipe(select('gameState', 'funds'));
    this.timeControlPanelVisible$ = this.store.pipe(
      select('gameState', 'timeActive'),
      filter((timeActive) => timeActive),
      first(),
      startWith(false)
    );
  }
}
