import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule, RoutingComponent } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClient } from "@angular/common/http";

// services
import { LoginService } from "./services/login/login.service";

import { FormsModule } from "@angular/forms";

// Material components
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { PanelMenuModule } from "primeng/panelmenu";

// custom pipes
import { ExponentialPipe } from "./filters/exponential.pipe";
import { UtcFormatPipe } from "./filters/utc-format.pipe";
import { SidebarComponent } from "./layouts/components/sidebar/sidebar.component";
import { NgZorroAntdModule, NZ_I18N, en_US } from "ng-zorro-antd";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { UserListComponent } from "./components/admin/user-list/user-list.component";
import { RoleListComponent } from "./components/admin/role-list/role-list.component";
import { LogsListComponent } from "./components/admin/logs-list/logs-list.component";
import { BbqApiService } from "./services/bbq-api/bbq-api.service";
import { ModalComponent } from "./components/admin/user-list/modal/modal.component";
import { RoleModalComponent } from "./components/admin/role-list/role-modal/role-modal.component";
import { ToastrModule } from "ngx-toastr";
import { SidebarModule } from "primeng/sidebar";
import { ViewSurveyModalComponent } from "./components/bd-management/manage-project/view-survey-modal/view-survey-modal.component";
import { ViewSurveyComponent } from "./components/bd-management/view-survey/view-survey.component";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { CategoryListComponent } from './components/bd-management/category-list/category-list.component';
import { ManageCategoryFormModalComponent } from './components/bd-management/category-list/manage-category-form-modal/manage-category-form-modal.component';
import { SurveyStatusComponent } from './components/bd-management/survey-status/survey-status.component';
import { ContractHistoryComponent } from './components/contract/contract-history/contract-history.component';
import { ManageQuestionComponent } from './components/bd-management/manage-question/manage-question.component';
import { QuestionListComponent } from './components/bd-management/question-list/question-list.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
    ExponentialPipe,
    UtcFormatPipe,
    SidebarComponent,
    UserListComponent,
    RoleListComponent,
    LogsListComponent,
    ModalComponent,
    RoleModalComponent,
    ViewSurveyModalComponent,
    ViewSurveyComponent,
    CategoryListComponent,
    ManageCategoryFormModalComponent,
    SurveyStatusComponent,
    ContractHistoryComponent,
    ManageQuestionComponent,
    QuestionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    NgZorroAntdModule,
    MatIconModule,
    ToastrModule.forRoot(),
    SidebarModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: "modal-content",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn"
    })
  ],
  entryComponents: [
    ModalComponent,
    RoleModalComponent,
    ViewSurveyModalComponent,
    ManageCategoryFormModalComponent
  ],
  providers: [
    LoginService,
    BbqApiService,
    HttpClient,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
