import { Component, Input, OnChanges } from '@angular/core';
import { achievementMap } from 'types/achievement.type';
import { keys, without, flow } from 'lodash/fp';

@Component({
  selector: 'app-achievement-panel',
  templateUrl: './achievement-panel.component.html',
})
export class AchievementPanelComponent implements OnChanges {
  @Input() achievements: string[];

  achievementMap = achievementMap;

  unachieved: string[] = [];

  constructor() {}

  ngOnChanges() {
    this.unachieved = flow(
      keys,
      without(this.achievements)
    )(this.achievementMap);
  }
}
