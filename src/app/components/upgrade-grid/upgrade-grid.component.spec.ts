import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { UpgradeGridComponent } from './upgrade-grid.component';
import { UpgradeCardComponent } from 'components/upgrade-card/upgrade-card.component';

describe('UpgradeGridComponent', () => {
  let component: UpgradeGridComponent;
  let fixture: ComponentFixture<UpgradeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpgradeGridComponent, MockComponent(UpgradeCardComponent)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeGridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.upgrades = [
      { property: 'salary', toLevel: 1 },
      { property: 'workEfficiency', toLevel: 2 },
    ];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
