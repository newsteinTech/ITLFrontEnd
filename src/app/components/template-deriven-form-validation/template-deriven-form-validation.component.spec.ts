import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDerivenFormValidationComponent } from './template-deriven-form-validation.component';

describe('TemplateDerivenFormValidationComponent', () => {
  let component: TemplateDerivenFormValidationComponent;
  let fixture: ComponentFixture<TemplateDerivenFormValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDerivenFormValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDerivenFormValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
