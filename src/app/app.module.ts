import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// services
import { LoginService } from './services/login/login.service';
import { FetchDataService } from './services/data/fetch-data.service';

import { FormsModule } from '@angular/forms';

// Material components
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

// custom pipes
import { ExponentialPipe } from './filters/exponential.pipe';
import { UtcFormatPipe } from './filters/utc-format.pipe';
import { SidebarComponent } from './layouts/components/sidebar/sidebar.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { RoleListComponent } from './components/admin/role-list/role-list.component';
import { LogsListComponent } from './components/admin/logs-list/logs-list.component';
import { BbqApiService } from './services/bbq-api/bbq-api.service';
import { ModalComponent } from './components/admin/user-list/modal/modal.component';

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
  ],
  entryComponents: [ModalComponent],
  providers: [LoginService, FetchDataService, BbqApiService, HttpClient, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
