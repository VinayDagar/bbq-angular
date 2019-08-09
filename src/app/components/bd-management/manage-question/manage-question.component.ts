import { Component, OnInit } from "@angular/core";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";
import { isEmpty, first } from "lodash";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-manage-question",
  templateUrl: "./manage-question.component.html",
  styleUrls: ["./manage-question.component.scss"]
})
export class ManageQuestionComponent implements OnInit {
  question = {};
  isActive = { label: "Active", value: true };
  statuses = [
    { label: "Active", value: true },
    { label: "Inactive", value: false }
  ];
  categories = [];
  selectedCategory = {};
  selectedAnswerType = { label: "Text", value: "text" };
  answerType;
  successMessage = "";
  mode = "add"; // add , edit

  constructor(private $http: BbqApiService, private router: ActivatedRoute) {}

  async ngOnInit() {
    this.router.queryParamMap.toPromise();
    if (!isEmpty(this.router.queryParamMap.toPromise())) {
      let mode = null;
      let questionId;
      this.router.queryParamMap.subscribe(params => {
        mode = params.mode;
        questionId = params.questionId
      })

      if (mode) this.mode = mode;
      if (questionId) {
        const result = await this.$http
          .get("question", {
            where: {
              id: questionId
            },
            include: [
              {
                model: "QuestionCategory"
              }
            ]
          })
          .toPromise();
        this.question = first(result);
        this.selectedCategory = this.question.question_category;
        this.selectedAnswerType = this.answerType.find(
          x => x.value === this.question.answerType
        );
        this.isActive = this.statuses.find(
          x => x.value === this.question.isActive
        );
      }
      this.fetchData();
    }
  }

  fetchData() {
    this.$http
      .get("question-category", {
        where: {
          isDeleted: false
        }
      })
      .subscribe(res => {this.categories = res});
  }
}
