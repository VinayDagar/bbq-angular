import { Component, OnInit, Input } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";
import { NzModalRef } from "ng-zorro-antd";

@Component({
  selector: "app-manage-category-form-modal",
  templateUrl: "./manage-category-form-modal.component.html",
  styleUrls: ["./manage-category-form-modal.component.scss"]
})
export class ManageCategoryFormModalComponent implements OnInit {
  @Input("category") category: Object;
  @Input("roles") roles: Array<any>;
  @Input("mode") mode: String;

  selectedRoles = [];
  API_URL = "http://localhost:3001/api/v1/";
  res = null;

  constructor(
    private toastr: ToastrService,
    private $http: BbqApiService,
    private tplModal: NzModalRef
  ) {}
  ngOnInit() {
    if (this.mode === "edit") {
      const catRoleIds = this.category.question_category_roles.map(
        c => c.roleId
      );
      this.selectedRoles = this.roles.filter(a => catRoleIds.includes(a.id));
    }
  }

  createOrUpdate() {
    console.log(this.selectedRoles)
    const questionRoles = this.selectedRoles.map(x => {
      return { roleId: x.id };
    });
    if (!questionRoles.length)
      return this.toastr.error("Editable by can not be empty");

    Object.assign(this.category, {
      name: this.category.name.toLowerCase(),
      questionRoles
    });
    this.create(this.category);
  }

  async create(data) {
    try {
      const category = await this.$http
        .get(this.API_URL+"question-category", {
          where: {
            name: data.name,
            isDeleted: true
          }
        })
        .toPromise();

      let successMessage = data.id
        ? "Category successfully updated"
        : "Category successfully created";
      if (!data.id) {
        const count = await this.$http.get(this.API_URL+"question-category/count").toPromise()
        data.order = count + 1;
      }

      if (!data.id && category && category.length) {
        const categoryID = category[0].id;
        this.res = await this.$http
          .updateById(this.API_URL+"question-category", categoryID, {
            isDeleted: false
          })
          .toPromise();
        successMessage = "Category successfully restored ";
      } else {
        console.log(data,'update')
        this.res = await this.$http
          .updateOrCreate(this.API_URL+"question-category", data)
          .toPromise();
      }

      if (
        data &&
        data.question_category_roles &&
        data.question_category_roles.length > 0
      ) {
        console.log(data.question_category_roles, 'question_category_roles')
        await Promise.all(
          data.question_category_roles.map(c =>
            this.$http.delete(this.API_URL+"question-category-role", c.id).toPromise()
          )
        );
      }
      console.log(this.res, 'response')
      await Promise.all(
        data.questionRoles.map(item =>
          this.$http
            .rawPost(this.API_URL+"question-category-role", {
              ...item,
              ...{ questionCategoryId: this.res.id }
            })
            .toPromise()
        )
      );
      this.toastr.success(successMessage);
      this.tplModal.destroy();
    } catch (err) {
      this.toastr.error(err.message);
    }
  }
}
