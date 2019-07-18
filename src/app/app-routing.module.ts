import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./layouts/dashboard/dashboard.component";
import { LoginComponent } from "./components/common/login/login.component";
import { GuardService } from "./services/AuthGuar/guard.service";
import { ManageProjectComponent } from "./components/bd-management/manage-project/manage-project.component";
import { DashboardHeaderComponent } from "./layouts/components/dashboard-header/dashboard-header.component";
import { UserListComponent } from "./components/admin/user-list/user-list.component";
import { RoleListComponent } from "./components/admin/role-list/role-list.component";
import { LogsListComponent } from "./components/admin/logs-list/logs-list.component";
import { ViewSurveyComponent } from './components/bd-management/view-survey/view-survey.component';
import { CategoryListComponent } from './components/bd-management/category-list/category-list.component';
import { SurveyStatusComponent } from './components/bd-management/survey-status/survey-status.component';
import { ContractHistoryComponent } from './components/contract/contract-history/contract-history.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [GuardService],
    children: [
      { path: "bd-survey-list", component: ManageProjectComponent },
      { path: "bd-view-survey/:id", component: ViewSurveyComponent },
      { path: "bd-category-list", component: CategoryListComponent },
      { path: "bd-survey-status-list", component: SurveyStatusComponent },
      { path: "contract-history", component: ContractHistoryComponent },
      { path: "user-list", component: UserListComponent },
      { path: "role-list", component: RoleListComponent },
      { path: "logs-list", component: LogsListComponent }
    ]
  },

  { path: "**", redirectTo: "login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const RoutingComponent = [
  DashboardComponent,
  LoginComponent,
  DashboardComponent,
  ManageProjectComponent,
  DashboardHeaderComponent,
  RoleListComponent,
  LogsListComponent
];
