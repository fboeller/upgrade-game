import {
  Component
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { GameState, pause, resume } from '../actions';

@Component({
  selector: 'app-time-control-panel',
  templateUrl: './time-control-panel.component.html',
  styleUrls: ['./time-control-panel.component.styl'],
})
export class TimeControlPanelComponent {

  timeActive$: Observable<boolean>;

  constructor(private store: Store<GameState>) {
    this.timeActive$ = store.pipe(select('timeActive'));
  }

  pause() {
    this.store.dispatch(pause());
  }

  resume() {
    this.store.dispatch(resume());
  }

}
