import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyType, Property } from 'src/app/property.type';

@Component({
  selector: 'app-property-row',
  templateUrl: './property-row.component.html',
  styleUrls: ['./property-row.component.styl']
})
export class PropertyRowComponent implements OnInit {

  @Input() propertyName: string;
  @Input() propertyType: PropertyType;
  @Input() propertyState: Property;
  @Input() upgradePossible: boolean;

  @Output('upgrade') upgradeOut: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  upgrade() {
    this.upgradeOut.emit();
  }

}
