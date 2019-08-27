import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncCardComponent } from './inc-card.component';

describe('IncCardComponent', () => {
  let component: IncCardComponent;
  let fixture: ComponentFixture<IncCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
