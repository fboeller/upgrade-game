import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import {
  PropertyType,
  propertyTypes,
  upgradeCostOf,
} from 'types/property-type.type';
import { Property } from 'types/property.type';

@Component({
  selector: 'app-property-row',
  templateUrl: './property-row.component.html',
})
export class PropertyRowComponent implements OnChanges {
  @Input() propertyName: Property;
  @Input() level: number;
  @Input() upgradePossible: boolean;
  @Input() upgradeConditions: { [property: string]: number };

  @Output() upgrade: EventEmitter<any> = new EventEmitter();
  @Output() visibleFundsEffect: EventEmitter<number> = new EventEmitter();

  propertyTypes = propertyTypes;

  propertyType: PropertyType;
  upgradeConditionProperties: string[] = [];
  showUpgradeDetails = false;

  constructor() {}

  ngOnChanges() {
    this.propertyType = propertyTypes[this.propertyName];
    this.upgradeConditionProperties = Object.keys(this.upgradeConditions);
  }

  onUpgradeButtonHover(isMouseOnButton: boolean) {
    this.showUpgradeDetails = isMouseOnButton;
    this.visibleFundsEffect.emit(
      isMouseOnButton ? upgradeCostOf(this.propertyName)(this.level) * -1 : null
    );
  }
}
