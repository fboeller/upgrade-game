import { Component, Input } from '@angular/core';
import { propertyTypes } from 'types/property-type.type';
import { Upgrade } from 'types/upgrade.type';

@Component({
  selector: 'app-upgrade-card',
  templateUrl: './upgrade-card.component.html',
})
export class UpgradeCardComponent {
  @Input() upgrade: Upgrade;

  propertyTypes = propertyTypes;

  constructor() {}

  get propertyType() {
    return this.propertyTypes[this.upgrade.property];
  }
}
