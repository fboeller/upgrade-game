import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBoostsListComponent } from './active-boosts-list.component';

describe('ActiveBoostsListComponent', () => {
  let component: ActiveBoostsListComponent;
  let fixture: ComponentFixture<ActiveBoostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveBoostsListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveBoostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
