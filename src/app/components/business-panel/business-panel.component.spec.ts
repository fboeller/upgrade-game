import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPanelComponent } from './business-panel.component';

describe('BusinessPanelComponent', () => {
  let component: BusinessPanelComponent;
  let fixture: ComponentFixture<BusinessPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
