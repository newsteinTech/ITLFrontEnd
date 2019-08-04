import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTrialComponent } from './form-trial.component';

describe('FormTrialComponent', () => {
  let component: FormTrialComponent;
  let fixture: ComponentFixture<FormTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
