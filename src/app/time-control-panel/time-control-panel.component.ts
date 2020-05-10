import {
  Component, OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { pause, resume, AppState } from '../actions';

@Component({
  selector: 'app-time-control-panel',
  templateUrl: './time-control-panel.component.html',
  styleUrls: ['./time-control-panel.component.styl'],
})
export class TimeControlPanelComponent implements OnInit {

  timeActive$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.timeActive$ = this.store.pipe(select('gameState'), select('timeActive'));
  }

  pause() {
    this.store.dispatch(pause());
  }

  resume() {
    this.store.dispatch(resume());
  }

}
