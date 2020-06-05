import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'types/property.type';

@Component({
  selector: 'app-upgrade-grid',
  templateUrl: './upgrade-grid.component.html',
})
export class UpgradeGridComponent implements OnInit {
  @Input() upgrades: { property: Property; toLevel: number }[];

  constructor() {}

  ngOnInit() {}
}
