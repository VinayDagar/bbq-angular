import { Component, OnInit } from "@angular/core";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";

@Component({
  selector: "app-logs-list",
  templateUrl: "./logs-list.component.html",
  styleUrls: ["./logs-list.component.scss"]
})
export class LogsListComponent implements OnInit {
  constructor(private $http: BbqApiService) {}
  items:Array<any> = [];
  totalItems = null;
  API_URL:String = "http://localhost:3000/api/v1/";
  headers = [
    { text: "Name", sortable: false },
    { text: "User Name", sortable: false },
    { text: "Resource Type", value: "entity", sortable: false, align: "left" },
    { text: "Action Type", value: "type", sortable: false },
    { text: "Role", sortable: false },
    { text: "Date", value: "created_at" }
  ];
  pageIndex = 1;
  pageSize = 5;

  ngOnInit() {
    this.getData();
  }

  getData(paginationAndSort = null) {
    const query = {
      where: {},
      include: [
        {
          model: "User",
          include: [
            {
              model: "Role"
            }
          ]
        }
      ]
    };
    if (paginationAndSort) {
      Object.assign(query, {
        order: [
          ["created_at", `${paginationAndSort.descending ? "ASC" : "DESC"}`]
        ],
        limit: paginationAndSort.rowsPerPage,
        offset: (paginationAndSort.page - 1) * paginationAndSort.rowsPerPage
      });
    }
    this.$http
      .get(this.API_URL + "log/find-and-count", query)
      .subscribe(res => {
        console.log(res,'res')
        this.items = res.data;
        this.totalItems = res.count;
      });
  }
}
