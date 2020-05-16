import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRowComponent } from './property-row.component';
import { plus } from 'types/increase.type';

describe('PropertyRowComponent', () => {
  let component: PropertyRowComponent;
  let fixture: ComponentFixture<PropertyRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyRowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyRowComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.propertyName = 'salary';
    component.propertyType = {
      displayName: 'My Property',
      upgradeText: 'Upgrade',
      valueOfLevel: (level) => level + 1,
      upgradeCostFromLevel: (level) => level + 1,
      upgradeConditionsFromLevel: (level) =>({}),
    };
    component.propertyState = {
      level: 1,
      becameAffordable: true,
    };
    component.upgradePossible = true;
    component.upgradeConditions = {};
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
