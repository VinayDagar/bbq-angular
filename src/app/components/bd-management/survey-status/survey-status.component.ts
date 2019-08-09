import { Component, OnInit } from "@angular/core";
import { orderBy, humanize, flattenDeep } from "lodash";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";

@Component({
  selector: "app-survey-status",
  templateUrl: "./survey-status.component.html",
  styleUrls: ["./survey-status.component.scss"]
})
export class SurveyStatusComponent implements OnInit {
  constructor(private $http: BbqApiService) {}

  ngOnInit() {
    this.getData()
  }
  items: Array<any> = [];
  search = null;
  pageSize = 5;
  headers = [
    { text: "Region", value: "region", width: "25%" },
    { text: "Project Title", value: "title" },
    { text: "Location", value: "location", width: "30%" },
    { text: "BD", value: "bd", width: "15%" },
    { text: "Legal", value: "legal", align: "center", width: "10%" },
    { text: "Operations", value: "operations", align: "center", width: "10%" },
    { text: "Project", value: "project", align: "center", width: "10%" },
  ];

  async getData() {
    const query = {
      where: {
        isDeleted: false
      },
      attributes: ["id", "status", "created_at", "title"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: "User",
          as: "CreatedBy",
          attributes: ["id", "fullName"],
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
          model: "SiteSurveyApproval",
          attributes: ["id", "status", "comment"],
          include: [
            {
              model: "User",
              as: "SurveyApprovalAssignedTo",
              attributes: ["id", "fullName"],
              include: [
                {
                  model: "Role"
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
    // if (this.isBD) Object.assign(query.where, { createdById: this.userId });

    let surveys = await this.$http.get("site-survey", query).toPromise()
    const items = [];

    for (const survey of surveys) {
      const data = {
        id: survey.id,
        status: survey.status,
        created_at: survey.created_at,
        bd: survey.CreatedBy ? survey.CreatedBy.fullName : "NA",
        project: "",
        legal: "",
        operations: "",
        region: "",
        location: "",
        title: ""
      };

      // if (survey.CreatedBy && survey.CreatedBy.UserRegions && survey.CreatedBy.UserRegions.length) {
      //     data.region = survey.CreatedBy.UserRegions.map(o => o.MstRegion.name).join(",");
      // }

      data.location = this.parseSiteLocation(survey.responses);
      data.region = this.parseSiteRegion(survey.responses);
      data.title = survey.title ? survey.title.toUpperCase() : survey.title;

      if (survey.SiteSurveyApprovals && survey.SiteSurveyApprovals.length) {
        for (const role of ["project", "legal", "operations"]) {
          const approval = survey.SiteSurveyApprovals.find(
            s => {
              if(s.SurveyApprovalAssignedTo && s.SurveyApprovalAssignedTo.role && s.SurveyApprovalAssignedTo.role.name){
                s.SurveyApprovalAssignedTo.role.name === role
              } 
            }
          );
          if (approval) data[role] = approval.status;
        }
      }
      items.push(data);
    }

    this.items = items;
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
}
