import { Component, OnInit } from "@angular/core";
import menus from "../../../../assets/menu-items.json";
import { Router } from '@angular/router';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  sidemenues: Array<any> = menus;
  // isCollasped:boolean = false;
  openMap: { [name: string]: boolean } = {
    sub: false
  };

  navigate(route) {
    console.log(`/${route}`)
    this.router.navigate([`dashboard/${route}`])
  }

  ngOnInit() {
    console.log(this.sidemenues, "this.sidemenues");
  }

  openHandler(value: string): void {
      this.openMap[value] !== false;
  }
}
