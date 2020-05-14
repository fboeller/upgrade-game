import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/actions/game.actions';
import { Store, select } from '@ngrx/store';
import { Achievement } from 'src/app/types/achievement.type';
import { Observable } from 'rxjs';
import { selectGameState } from 'src/app/selectors/game.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-achievement-panel',
  templateUrl: './achievement-panel.component.html',
  styleUrls: ['./achievement-panel.component.styl'],
})
export class AchievementPanelComponent implements OnInit {
  achievements$: Observable<Achievement[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.achievements$ = this.store.pipe(
      select(selectGameState),
      map((state) => state.achievements)
    );
  }
}
