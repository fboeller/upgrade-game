import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PropertyType, propertyTypes } from 'types/property-type.type';
import { PropertyState } from 'types/property-state.type';

@Component({
  selector: 'app-property-row',
  templateUrl: './property-row.component.html',
  styleUrls: ['./property-row.component.styl'],
})
export class PropertyRowComponent implements OnChanges {

  @Input() propertyName: string;
  @Input() propertyType: PropertyType;
  @Input() propertyState: PropertyState;
  @Input() upgradePossible: boolean;
  @Input() upgradeConditions: { [property: string]: number };

  @Output('upgrade') upgradeOut: EventEmitter<any> = new EventEmitter();
  @Output('visibleFundsEffect') visibleFundsEffect: EventEmitter<number> = new EventEmitter();

  propertyTypes = propertyTypes;

  upgradeConditionProperties: string[];
  showUpgradeDetails: boolean = false;

  constructor() { }

  ngOnChanges() {
    this.upgradeConditionProperties = Object.keys(this.upgradeConditions);
  }

  upgrade() {
    this.upgradeOut.emit();
  }

  onUpgradeButtonHover(isMouseOnButton: boolean) {
    this.showUpgradeDetails = isMouseOnButton;
    this.visibleFundsEffect.emit(isMouseOnButton ? this.propertyState.upgradeCost * -1 : null);
  }

}
