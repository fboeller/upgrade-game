import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeCardComponent } from './upgrade-card.component';

describe('UpgradeCardComponent', () => {
  let component: UpgradeCardComponent;
  let fixture: ComponentFixture<UpgradeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpgradeCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.propertyName = 'salary';
    component.level = 0;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
