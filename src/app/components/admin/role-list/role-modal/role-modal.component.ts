import { Component, OnInit, Input } from "@angular/core";
import { BbqApiService } from "src/app/services/bbq-api/bbq-api.service";
import { NzModalService, NzModalRef } from "ng-zorro-antd";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-role-modal",
  templateUrl: "./role-modal.component.html",
  styleUrls: ["./role-modal.component.scss"]
})
export class RoleModalComponent implements OnInit {
  @Input("role") role: Array<any>;
  @Input("currentRole") currentRole: Object;
  @Input("regions") regions: Array<any>;
  @Input("superCategories") superCategories: Array<any>;
  @Input("mode") mode: String;
  @Input("permissions") permissions: Array<any>;

  // tplModal: NzModalRef;
  selectedPermission = [];
  API_URL = "http://localhost:3001/api/v1/";

  constructor(
    private $http: BbqApiService,
    private tplModal: NzModalRef,
    private toastr: ToastrService
  ) {}

  createOrUpdate() {
    try {
      const permission = this.selectedPermission
        ? this.selectedPermission.map(x => x.value)
        : [];
        if(this.mode === 'add') {
          this.currentRole.name = this.currentRole.label.toLowerCase();
        }

        Object.assign(this.currentRole, {permission})

        if(this.currentRole.permission && this.currentRole.permission.length) {
          this.$http.updateOrCreate(this.API_URL+"role", this.currentRole).subscribe(res => {
            this.tplModal.destroy();
            const successMessage = this.currentRole.id
              ? "Role successfully updated"
              : "Role successfully created";
              this.toastr.success(successMessage)
          });
        } else {
          this.toastr.error('Permission are required')
        }

      // <nz-alert nzBanner nzMessage="Warning text"></nz-alert>
      // this.$message.success(successMessage);

      // this.getData();
    } catch (err) {
      const msg = err.object.message || err.message;
      this.toastr.success(msg)
    }
  }

  ngOnInit() {
    if (this.currentRole && this.permissions && this.permissions.length) {
      const val = this.currentRole;
      this.selectedPermission = this.permissions.filter(
        r => val.permission && val.permission.includes(r.value)
      );
    }
  }
}
