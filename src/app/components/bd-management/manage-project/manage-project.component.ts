import { Component, OnInit } from "@angular/core";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";
import { isEmpty, orderBy, flattenDeep } from "lodash";
import { NzModalService } from "ng-zorro-antd";
import { ViewSurveyModalComponent } from "./view-survey-modal/view-survey-modal.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-manage-project",
  templateUrl: "./manage-project.component.html",
  styleUrls: ["./manage-project.component.scss"]
})
export class ManageProjectComponent implements OnInit {
  constructor(
    private $http: BbqApiService,
    private modalService: NzModalService,
    private router: Router
  ) {}
  API_URL = "http://localhost:3001/api/v1/";
  items: Array<any> = [];
  roles: Array<any> = [];
  pageSize = 5;
  surveyNotes = null;
  headers = [
    {
      text: "Region",
      value: "region",
      width: "17%"
    },
    {
      text: "Project Title",
      value: "title"
    },
    {
      text: "Location",
      value: "location",
      width: "30%"
    },
    {
      text: "Created By",
      value: "CreatedBy.fullName",
      width: "10%"
    },
    {
      text: "Status",
      value: "status",
      width: "10%"
    },
    {
      text: "Created At",
      value: "created_at",
      width: "10%"
    },
    {
      text: "Actions",
      value: "actions",
      sortable: false,
      align: "center",
      width: "13%"
    }
  ];

  ngOnInit() {
    this.getData();
  }
  getData() {
    const query = {
      where: {
        isDeleted: false
      },
      include: [
        {
          model: "User",
          as: "CreatedBy",
          include: [
            {
              model: "UserRegion",
              include: [
                {
                  model: "MstRegion"
                }
              ]
            }
          ]
        },
        {
          model: "Response",
          attributes: ["id", "response", "question"],
          include: [
            {
              model: "QuestionCategory",
              where: {
                name: "location"
              },
              attributes: ["name", "order"]
            }
          ]
        }
      ]
    };

    this.$http.get(this.API_URL + "site-survey", query).subscribe(res => {
      this.items = res.map(survey => {
        survey.location = this.parseSiteLocation(survey.responses);
        survey.region = this.parseSiteRegion(survey.responses);
        return survey;
      });
    });
  }

  deleteProject(id) {
    this.$http.updateById(this.API_URL+"site-survey", id, {
      isDeleted: true
    }).subscribe(res =>  {
      this.getData();
      console.log('res',res)
    })
  }

  parseSiteRegion(responses) {
    let locationResponses = responses.filter(
      r => r.question_category.name === "location"
    );

    if (locationResponses && locationResponses.length) {
      const res = locationResponses.find(r => r.question.label === "Region");
      if (res)
        return res.response && res.response.length ? res.response[0] : "";
    }
    return "";
  }
  parseSiteLocation(responses) {
    let locationResponses = responses.filter(
      r => r.question_category.name === "location"
    );

    locationResponses = locationResponses.filter(
      r => !["coordinates", "site_coordinates"].includes(r.question.answerType)
    );
    locationResponses = orderBy(locationResponses, ["question.order"], ["asc"]);

    let address = locationResponses.map(r => r.response);

    address = flattenDeep(address);

    // return address && address.length) ? address[0] : '';
    return address.join(",");
  }

  viewSurveyNotes(surveyId) {
    this.$http
      .get(this.API_URL + "site-survey-note", {
        where: {
          siteSurveyId: surveyId
        },
        include: [
          {
            model: "User",
            as: "SurveyNoteCreatedBy"
          }
        ]
      })
      .subscribe(res => {
        this.surveyNotes = res;
        console.log(res);
      });
    this.modalService.create({
      nzTitle: "Project Notes",
      nzContent: ViewSurveyModalComponent,
      nzFooter: null,
      nzClosable: false,
      nzWidth: 600,
      nzComponentParams: {
        surveyNotes: this.surveyNotes
      }
    });
  }

  manageSurvey(id) {
    this.router.navigate(['/dashboard/bd-view-survey/'+id+'/'])
  }
}
