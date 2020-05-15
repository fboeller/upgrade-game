import {
  Component, Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import { pause, resume, AppState } from '../../actions/game.actions';

@Component({
  selector: 'app-time-control-panel',
  templateUrl: './time-control-panel.component.html',
  styleUrls: ['./time-control-panel.component.styl'],
})
export class TimeControlPanelComponent {

  @Input() timeActive: boolean;

  constructor(private store: Store<AppState>) {}

  pause() {
    this.store.dispatch(pause());
  }

  resume() {
    this.store.dispatch(resume());
  }

}
