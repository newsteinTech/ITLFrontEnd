import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDashComponent } from './bar-dash.component';

describe('BarDashComponent', () => {
  let component: BarDashComponent;
  let fixture: ComponentFixture<BarDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
