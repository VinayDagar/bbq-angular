import { Component, OnInit } from "@angular/core";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";

@Component({
  selector: "app-contract-history",
  templateUrl: "./contract-history.component.html",
  styleUrls: ["./contract-history.component.scss"]
})
export class ContractHistoryComponent implements OnInit {
  constructor(private $http: BbqApiService) {}
  items: Array<any> = [];
  user: Object = {};
  pageSize = 5;
  headers = [
    { text: "Code", align: "center", value: "id" },
    { text: "Vendor Name", value: "Vendor.companyName" },
    { text: "Category", align: "left", value: "MstCategory.name" },
    { text: "Created By", value: "User.fullName" },
    { text: "Date", align: "left", value: "", sortable: false },
    // { text: "To Date", align: "left", value: "toDate" },
    { text: "Status", align: "left", value: "status" },
    { text: "Actions", value: "actions", sortable: false, align: "center" }
  ];
  options: [
    { value: null, name: 'All'},
    { value: "sent_to_vendor", name: "Sent to Vendor" },
    { value: "rejected_by_vendor", name: "Rejected by Vendor" },
    { value: "change_request", name: "Change request" },
    { value: "approved", name: "Approved" },
  ];

  ngOnInit() {
    this.getItem();
    let user = localStorage.getItem("user");
    this.user = JSON.parse(user);
  }

  getItem() {
    const query = {
      where: {},
      include: [
        {
          model: "ContractArea",
          include: [
            {
              model: "MstArea"
            }
          ]
        },
        {
          model: "Vendor"
        },
        {
          model: "User"
        },
        {
          model: "MstCategory"
        }
      ]
    };
    if (this.user.role === "vendor") {
      query.where = {
        vendorId: {
          $eq: this.user.id
        },
        status: {
          $ne: "draft"
        }
      };
    }
    // if (this.isSourcingTeam || this.isCoorporateSourcingTeam) {
    //   query.where = {
    //     createdBy: {
    //       $eq: user.id
    //     }
    //   };
    // }
    if (this.user.role === '"superadmin"') {
      query.where = {
        status: {
          $ne: "draft"
        }
      };
    }

    this.$http.get("contract", query).subscribe(res => {
      this.items = res;
    });
  }
}
