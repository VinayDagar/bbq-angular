import { Component, OnInit } from "@angular/core";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-question-list",
  templateUrl: "./question-list.component.html",
  styleUrls: ["./question-list.component.scss"]
})
export class QuestionListComponent implements OnInit {
  headers = [
    {
      text: "Label",
      align: "left",
      sortable: true,
      value: "label"
    },
    { text: "Category", value: "question_category.name" },
    { text: "Help Text", value: "helpText" },
    { text: "Answer Type", value: "answerType" },
    { text: "Active", value: "isActive" },
    { text: "Actions", value: "actions", sortable: false, align: "right" }
  ];
  items: Array<any> = [];
  pageIndex = 1;
  pageSize = 5;
  search = null;
  l;

  constructor(private $http: BbqApiService, private router: Router) {}
  ngOnInit() {
    this.getData();
  }

  getData() {
    const query = {
      where: { isDeleted: false },
      include: [
        {
          model: "QuestionCategory"
        }
      ]
    };
    this.$http.get("question", query).subscribe(res => {
      this.items = res;
    });
  }

  manageItem(id) {
    const query = {
      mode: id ? "edit" : "add"
    };
    if (id) {
      Object.assign(query, { questionId: id });
    }
    this.router.navigate(["/dashboard/manage-question"], {
      queryParams: query
    });
  }
  deleteItem(id) {
      this.$http.updateById("question", id, {
        isDeleted: true
      }).subscribe(res =>{
        this.getData();
      })
      this.search = null;
  }
}
