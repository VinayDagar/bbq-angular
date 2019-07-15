import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-survey-modal',
  templateUrl: './view-survey-modal.component.html',
  styleUrls: ['./view-survey-modal.component.scss']
})
export class ViewSurveyModalComponent implements OnInit {
  @Input('surveyNotes') surveyNotes: Array<any>

  constructor() { }

  ngOnInit() {
    console.log(this.surveyNotes, 'surveyNotes')
  }

}
