import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentByAssignedToComponent } from './incident-by-assigned-to.component';

describe('IncidentByAssignedToComponent', () => {
  let component: IncidentByAssignedToComponent;
  let fixture: ComponentFixture<IncidentByAssignedToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentByAssignedToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentByAssignedToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
