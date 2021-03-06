import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRowComponent } from './property-row.component';

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
      unit: '$',
      valueOfLevel: (level) => level + 1,
      upgradeCostFromLevel: (level) => level + 1,
      upgradeConditionsFromLevel: (level) => ({}),
    };
    component.level = 1;
    component.upgradePossible = true;
    component.upgradeConditions = {};
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
