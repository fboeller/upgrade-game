import { Component, Input } from '@angular/core';
import { achievementMap } from 'types/achievement.type';

@Component({
  selector: 'app-achievement-panel',
  templateUrl: './achievement-panel.component.html',
  styleUrls: ['./achievement-panel.component.styl'],
})
export class AchievementPanelComponent {
  @Input() achievements: string[];

  achievementMap = achievementMap;

  constructor() {}
}
