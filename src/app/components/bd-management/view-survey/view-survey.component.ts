import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";
import { orderBy } from 'lodash'

@Component({
  selector: "app-view-survey",
  templateUrl: "./view-survey.component.html",
  styleUrls: ["./view-survey.component.scss"]
})
export class ViewSurveyComponent implements OnInit {
  constructor(private router: ActivatedRoute, private $http: BbqApiService) {}
  routeParam: any = null;
  data: Array<any> = [];

  ngOnInit() {
    this.router.params.subscribe(a => {
      this.routeParam = a.id;
    });

    if (this.routeParam) {
      this.$http
        .get("question-category", {
          where: {
            isDeleted: false
          },
          include: [
            {
              model: "Response",
              where: {
                siteSurveyId: this.routeParam
              }
              // required:false,
            }
          ],
          order: [["order", "ASC"]]
        })
        .subscribe(res => (this.data = res));
    }
  }

  orderByItem(items) {
    return orderBy(items, ["question.order"], ["asc"]);
  }
}
