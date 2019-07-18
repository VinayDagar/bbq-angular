import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyStatusComponent } from './survey-status.component';

describe('SurveyStatusComponent', () => {
  let component: SurveyStatusComponent;
  let fixture: ComponentFixture<SurveyStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
