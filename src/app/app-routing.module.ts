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

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [GuardService],
    children: [
      { path: "bd/site-survey", component: ManageProjectComponent },
      { path: "admin/user-list", component: UserListComponent },
      { path: "admin/role-list", component: RoleListComponent },
      { path: "admin/logs-list", component: LogsListComponent }
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
