import { Component, OnInit, Input } from "@angular/core";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";
import { NzModalRef } from "ng-zorro-antd";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  @Input("users") users: Array<any>;
  @Input("roles") roles: Array<any>;
  @Input("supercategories") supercategories: Array<any>;
  @Input("regions") regions: Array<any>;
  @Input("areas") areas: Array<any>;
  @Input("mode") mode: String;
  @Input("currentUser") currentUser: Object;

  ngOnInit() {
    if (this.mode === "add") {
      this.type = null;
      this.selectedSuperCategory = null;
      this.selectedRegions = [];
      this.selectedAreas = [];
      this.selectedRole = null;
      this.selectedUser = null;
    } else {
      this.type = this.selectedUser.type;
      if (this.selectedUser.UserSuperCategories && this.selectedUser.UserSuperCategories.length) {
        const id = this.selectedUser.UserSuperCategories[0].superCategoryId;
        this.selectedSuperCategory = this.supercategories.filter(
          s => s.id === id
        );
      } else {
        this.selectedSuperCategory = [];
      }
    }
  }
  constructor(
    private $http: BbqApiService,
    private tplModal: NzModalRef,
    private toastr: ToastrService
  ) {}

  selectedUser = null;
  selectedRole = null;
  selectedRegions = [];
  selectedSuperCategory = null;
  selectedAreas = [];
  type = null;
  roleTypes = [
    { text: "IS Sourcing", value: "sourcing" },
    { text: "IS Coorporate Sourcing", value: "coorporate_sourcing" },
    { text: "IS MDM", value: "mdm" }
  ];

  userLabel(user) {
    return user.fullName + " - " + user.employeeCode;
  }
  save() {
    this.users = this.users.filter(x => x.id !== this.selectedUser.userId);

    try {
      if (
        this.selectedUser &&
        this.selectedUser.UserAreas &&
        this.selectedUser.UserAreas.length > 0
      ) {
        this.$http.bulkDelete(
          "http://localhost:3000/api/v1/user-area",
          this.selectedUser.UserAreas
        );
      }

      if (
        this.selectedUser &&
        this.selectedUser.UserRegions &&
        this.selectedUser.UserRegions.length > 0
      ) {
        this.$http.bulkDelete("user-region", this.selectedUser.UserRegions);
      }

      if (
        this.selectedUser &&
        this.selectedUser.UserSuperCategories &&
        this.selectedUser.UserSuperCategories.length
      ) {
        this.selectedUser.UserSuperCategories.forEach(element => {
          this.$http.delete(
            "http://localhost:3000/api/v1/user-super-category",
            this.selectedUser.UserSuperCategories
          );
        });
      }

      if (this.selectedAreas && this.selectedAreas.length) {
        const areas = this.selectedAreas.map(el => ({
          userId: this.selectedUser.id,
          areaId: el
        }));
        areas.forEach(area => {
          this.$http
            .rawPost("http://localhost:3000/api/v1/user-area", area)
            .subscribe(res => {
              console.log(res, "selectedAreas");
            });
        });
      }
      if (this.selectedRegions && this.selectedRegions.length) {
        const regions = this.selectedRegions.map(el => ({
          userId: this.selectedUser.id,
          regionId: el.id
        }));
        regions.forEach(region => {
          this.$http
            .rawPost("http://localhost:3000/api/v1/user-region", region)
            .subscribe(res => console.log(res, "selected region"));
        });
      }
      if (this.selectedSuperCategory) {
        // const userSuperCategoryId = data.superCategories;
        this.$http
          .rawPost("http://localhost:3000/api/v1/user-super-category", {
            userId: this.selectedUser.id,
            superCategoryId: this.selectedSuperCategory.id
          })
          .subscribe(res => console.log(res, "selected super category"));
      }
      this.$http
        .updateById("http://localhost:3000/api/v1/user", this.selectedUser.id, {
          roleId: this.selectedRole.id,
          sourcingType: this.selectedSuperCategory.id
        })
        .subscribe(res => {
          this.tplModal.destroy();
          this.toastr.success("Success");
        });
    } catch (err) {
      this.toastr.error(err.message);
    }
  }
}
