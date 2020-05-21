import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'types/property.type';
import { propertyTypes } from 'types/property-type.type';

@Component({
  selector: 'app-upgrade-card',
  templateUrl: './upgrade-card.component.html',
  styleUrls: ['./upgrade-card.component.styl'],
})
export class UpgradeCardComponent implements OnInit {
  @Input() propertyName: Property;
  @Input() level: number;

  propertyTypes = propertyTypes;

  constructor() {}

  ngOnInit() {}

  get propertyType() {
    return this.propertyTypes[this.propertyName];
  }
}
