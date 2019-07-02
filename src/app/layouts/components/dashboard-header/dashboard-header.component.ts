import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  template: `
    <mat-toolbar class="aside">
      <span>Dashboard</span>
      <span class="example-spacer"></span>
      <button mat-flat-button color="default" (click)="_logout()">Logout</button>
    </mat-toolbar>
  `,
  styles: ['.example-spacer {flex: 1 1 auto;}', '.example-icon {padding: 0 14px;}']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(private route: Router) { }
  _logout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }

  ngOnInit() {
  }

}
