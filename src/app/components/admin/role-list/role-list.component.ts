import { Component, OnInit } from "@angular/core";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";
import { NzModalService } from "ng-zorro-antd";
import { RoleModalComponent } from "./role-modal/role-modal.component";

@Component({
  selector: "app-role-list",
  templateUrl: "./role-list.component.html",
  styleUrls: ["./role-list.component.scss"]
})
export class RoleListComponent implements OnInit {
  constructor(
    private $http: BbqApiService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.getData();
    this.$http.get(this.API_URL + "role").subscribe(res => (this.roles = res));
    this.$http
      .get(this.API_URL + "mst-super-category")
      .subscribe(res => (this.superCategories = res));
    this.$http
      .get(this.API_URL + "mst-region")
      .subscribe(res => (this.regions = res));
  }

  getData(paginationAndSort = null) {
    const query = {
      where: {
        name: {
          $notIn: ["erp_user", "superadmin"]
        }
      }
    };
    this.$http.get(this.API_URL + "role", query).subscribe(res => {
      console.log(res, "res");
      this.items = res;
    });
  }

  parsePermission(permissions) {
    if ((permissions && !permissions.length) || !this.getRoleRoutes()) return "NA";
    return this.getRoleRoutes().filter(a => permissions.includes(a.value)).map(a => a.name)
  }

  getRoleRoutes() {
    const list = [
      {
        name: "Manage Question Category (BD Management)",
        value: "bd.category.list"
      },
      {
        name: "Manage Project (BD Management)",
        value: "bd.survey.list"
      },
      {
        name: "Manage Question (BD Management)",
        value: "bd.question.list"
      },
      {
        name: "Project Status (BD Management)",
        value: "bd.survey.status.list"
      },
      {
        name: "New / Renew Contract (Contact Management)",
        value: "contract.create"
      },
      {
        name: "Manage Template (Contact Management)",
        value: "template.create"
      },
      {
        name: "Contract History (Contact Management)",
        value: "contract.history"
      },
      {
        name: "Manange User (User Management)",
        value: "user.list"
      },
      {
        name: "Manange Log (User Management)",
        value: "logs.list"
      },
      {
        name: "Manange Role (User Management)",
        value: "role.list"
      },
      {
        name: "Manage Vendor (Vendor Management)",
        value: "vendor.list"
      }
    ];
    return list;
  }

  headers = [
    { text: "Role Name", align: "left", value: "name" },
    { text: "Permission", value: "permission" },
    // { text: "Region", value: "region" },
    { text: "Actions", value: "actions", sortable: false, align: "right" }
  ];
  API_URL = "http://localhost:3000/api/v1/";
  items = [];
  roles = [];
  pageSize = 5;
  superCategories = [];
  pageIndex = 1;
  regions = [];
  currentRole = {};

  createModal(mode, data = {}): void {
    this.modalService.create({
      nzTitle: "Role",
      nzContent: RoleModalComponent,
      nzFooter: null,
      nzClosable: false,
      nzWidth: 600,
      nzComponentParams: {
        role: this.items,
        currentRole: data,
        regions: this.regions,
        superCategories: this.superCategories,
        mode: mode,
        permissions: this.getRoleRoutes()
      }
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
  }
}
