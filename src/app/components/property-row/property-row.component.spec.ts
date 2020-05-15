import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRowComponent } from './property-row.component';
import { plus } from 'src/app/types/increase.type';

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
    component.propertyName = 'myProperty';
    component.propertyType = {
      displayName: 'My Property',
      upgradeText: 'Upgrade',
    };
    component.propertyState = {
      value: 1,
      upgradeEffect: plus(1),
      upgradeCost: 1,
      upgradeCostIncrease: 1,
      upgradeConditions: {},
      becameAffordable: true,
    };
    component.upgradePossible = true;
    component.upgradeConditions = {};
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
