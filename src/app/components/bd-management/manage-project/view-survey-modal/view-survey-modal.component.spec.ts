import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSurveyModalComponent } from './view-survey-modal.component';

describe('ViewSurveyModalComponent', () => {
  let component: ViewSurveyModalComponent;
  let fixture: ComponentFixture<ViewSurveyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSurveyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSurveyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
