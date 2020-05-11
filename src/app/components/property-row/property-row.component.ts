import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyType, PropertyState } from 'src/app/property.type';

@Component({
  selector: 'app-property-row',
  templateUrl: './property-row.component.html',
  styleUrls: ['./property-row.component.styl']
})
export class PropertyRowComponent implements OnInit {

  @Input() propertyName: string;
  @Input() propertyType: PropertyType;
  @Input() propertyState: PropertyState;
  @Input() upgradePossible: boolean;

  @Output('upgrade') upgradeOut: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  upgrade() {
    this.upgradeOut.emit();
  }

}
