import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { UpgradeCardComponent } from './upgrade-card.component';

describe('UpgradeCardComponent', () => {
  let component: UpgradeCardComponent;
  let fixture: ComponentFixture<UpgradeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule],
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
