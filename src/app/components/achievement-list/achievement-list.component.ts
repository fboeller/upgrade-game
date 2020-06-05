import { Component, Input } from '@angular/core';
import { achievementMap } from 'types/achievement.type';

@Component({
  selector: 'app-achievement-list',
  templateUrl: './achievement-list.component.html',
})
export class AchievementListComponent {
  @Input() achievements: string[];

  achievementMap = achievementMap;

  constructor() {}
}
