import { Component, Input } from '@angular/core';
import { Upgrade } from 'types/upgrade.type';

@Component({
  selector: 'app-upgrade-grid',
  templateUrl: './upgrade-grid.component.html',
})
export class UpgradeGridComponent {
  @Input() upgrades: Upgrade[];

  constructor() {}
}
