import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentByGroupComponent } from './incident-by-group.component';

describe('IncidentByGroupComponent', () => {
  let component: IncidentByGroupComponent;
  let fixture: ComponentFixture<IncidentByGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentByGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
