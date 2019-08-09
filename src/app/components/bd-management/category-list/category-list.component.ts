import { Component, OnInit } from "@angular/core";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";
import { NzModalService } from "ng-zorro-antd";
import { ManageCategoryFormModalComponent } from "./manage-category-form-modal/manage-category-form-modal.component";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"]
})
export class CategoryListComponent implements OnInit {
  headers = [
    {
      text: "Order",
      align: "left",
      value: "order"
    },
    { text: "Name", value: "name" },
    { text: "Editable By", value: "roles", sortable: false },
    { text: "Actions", value: "actions", sortable: false, align: "right" }
  ];
  items = [];
  roles = [];
  question = {};
  selectedCategory = {};
  selectedAnswerType = {};
  mode = "add";
  currentCategory = {};
  pageIndex = 1;
  pageSize = 5;

  constructor(
    private $http: BbqApiService,
    private modalService: NzModalService
  ) {}
  ngOnInit() {
    this.$http
      .get("role", {
        where: {
          name: {
            $notIn: ["erp_user", "superadmin"]
          }
        }
      })
      .subscribe(res => {
        this.roles = res;
      });
    this.getData();
  }

  getData() {
    const query = {
      where: { isDeleted: false },
      distinct: true,
      include: [
        {
          model: "QuestionCategoryRole"
        }
      ],
      order: [["order", "ASC"]]
    };

    this.$http.get("question-category", query).subscribe(res => {
      const data = res;
      this.items = data.map(el => {
        const roleIds = el.question_category_roles.map(c => c.roleId);
        return {
          ...el,
          roles: this.roles
            .filter(r => roleIds.includes(r.id))
            .map(r => r.label)
        };
      });
    });

    console.log(this.items, "items");
  }
  createUpdateModal(type, category = {}) {
    this.modalService.create({
      nzTitle: `${type.toUpperCase()} Question Category`,
      nzContent: ManageCategoryFormModalComponent,
      nzFooter: null,
      nzClosable: false,
      nzWidth: 600,
      nzComponentParams: {
        category: category,
        roles: this.roles,
        mode: type
      }
    });
  }
  async delete(category) {
    if (
      category &&
      category.question_category_roles &&
      category.question_category_roles.length > 0
    ) {
      await Promise.all(
        category.question_category_roles.map(el =>
          this.$http.delete("question-category-role", el.id).toPromise()
        )
      );
    }

    await this.$http
      .update(
        "question",
        {
          where: {
            questionCategoryId: category.id
          }
        },
        { isDeleted: true }
      ).toPromise()

    await this.$http.updateById("question-category", category.id, {
      isDeleted: true
    }).toPromise()

    this.getData();
  }
}
