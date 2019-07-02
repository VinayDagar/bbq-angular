import { Component, OnInit } from "@angular/core";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";
import { NzModalRef, NzModalService } from "ng-zorro-antd";
import { ModalComponent } from "./modal/modal.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  constructor(
    private $http: BbqApiService,
    private modalService: NzModalService
  ) {}
  sortName: string | null = null;
  API_URL = 'http://localhost:3000/api/v1/'
  sortValue: string | null = null;
  userData: Array<any> = [];
  pageIndex = 1;
  pageSize = 5;
  isVisible = false;
  roles: [];
  regions: [];
  areas: [];
  selectedUser: null;
  superCategories: [];
  users: [];

  ngOnInit() {
    this.getData();
    this.$http
      .get(this.API_URL+"role", {
        where: {
          name: {
            $notIn: ["superadmin"]
          }
        }
      })
      .subscribe(role => {
        this.roles = role;
      });
    this.$http
      .get(this.API_URL+"mst-super-category")
      .subscribe(superCategory => (this.superCategories = superCategory));
    this.$http.get(this.API_URL+"mst-region").subscribe(region => (this.regions = region));
    this.$http.get(this.API_URL+"mst-area").subscribe(area => (this.areas = area));
    this.$http
      .get(this.API_URL+"user", {
        where: {
          roleId: {
            $eq: 0
          },
          userType: {
            $iLike: "employee"
          }
        },
        attributes: ["id", "fullName", "userName", "employeeCode"]
      })
      .subscribe(user => (this.users = user));
  }

  headers = [
    { text: "User Name", value: "userName" },
    { text: "Name", align: "left", value: "fullName" },
    { text: "Role", value: "role.name" },
    { text: "Sourcing Type", value: "sourcingType" },
    { text: "Super Category", value: "superCategory" },
    { text: "Region", value: "region", sortable: false },
    { text: "Actions", value: "actions", sortable: false, align: "right" }
  ];

  async getData(paginationAndSort = null) {
    const query = {
      attributes: [
        "id",
        "fullName",
        "userName",
        "employeeCode",
        "phone",
        "sourcingType"
      ],
      include: [
        {
          model: "Role",
          where: {
            name: {
              $notIn: ["superadmin"]
            }
          }
        },
        {
          model: "UserArea"
        },
        {
          model: "UserRegion",
          include: [
            {
              model: "MstRegion"
            }
          ]
        },
        {
          model: "UserSuperCategory",
          include: [
            {
              model: "MstSuperCategory"
            }
          ]
        }
      ]
    };

    this.$http
      .get("http://localhost:3000/api/v1/user/find-and-count", query)
      .subscribe(data => {
        this.userData = data.data;
        console.log(data, "user data");
      });
  }

  createModal(): void {
    this.modalService.create({
      nzTitle: "Add User",
      nzContent: ModalComponent,
      nzFooter: null,
      nzClosable: false,
      nzWidth: 800,
      nzComponentParams: {
        users: this.users,
        areas: this.areas,
        supercategories: this.superCategories,
        regions: this.regions,
        roles: this.roles,
        mode: 'edit'
      }
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
  }

}
