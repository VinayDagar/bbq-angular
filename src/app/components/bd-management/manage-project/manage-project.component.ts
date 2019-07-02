import { Component, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FetchDataService } from 'src/app/services/data/fetch-data.service';

export interface PeriodicElement {
  region: string;
  location: number;
  createdBy: number;
  status: string;
  createdAt: string;
  action: string;
}


@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.scss']
})
export class ManageProjectComponent implements OnInit {

  constructor(private siteSurvey: FetchDataService) { }

  ngOnInit() {
    this.siteSurvey.getSiteSurvey()
      .subscribe(data => {
        console.log(data, 'site survey')
      })
  }

}
