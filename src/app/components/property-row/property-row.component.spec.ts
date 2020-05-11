import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRowComponent } from './property-row.component';

describe('PropertyRowComponent', () => {
  let component: PropertyRowComponent;
  let fixture: ComponentFixture<PropertyRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
