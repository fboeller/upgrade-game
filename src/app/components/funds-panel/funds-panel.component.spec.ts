import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsPanelComponent } from './funds-panel.component';

describe('FundsPanelComponent', () => {
  let component: FundsPanelComponent;
  let fixture: ComponentFixture<FundsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
