import { Component, OnInit, NgModule } from "@angular/core";
import {DashboardHeaderComponent} from "../components/dashboard-header/dashboard-header.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})

export class DashboardComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    const user = localStorage.getItem('user');
    console.log(JSON.parse(user));
  }
}
