import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PropertyType, PropertyState, propertyTypes } from 'src/app/property.type';

@Component({
  selector: 'app-property-row',
  templateUrl: './property-row.component.html',
  styleUrls: ['./property-row.component.styl']
})
export class PropertyRowComponent implements OnChanges {

  @Input() propertyName: string;
  @Input() propertyType: PropertyType;
  @Input() propertyState: PropertyState;
  @Input() upgradePossible: boolean;
  @Input() upgradeConditions: { [property: string]: number };

  @Output('upgrade') upgradeOut: EventEmitter<any> = new EventEmitter();

  propertyTypes = propertyTypes;

  upgradeConditionProperties: string[];

  constructor() { }

  ngOnChanges() {
    this.upgradeConditionProperties = Object.keys(this.upgradeConditions);
  }

  upgrade() {
    this.upgradeOut.emit();
  }

}