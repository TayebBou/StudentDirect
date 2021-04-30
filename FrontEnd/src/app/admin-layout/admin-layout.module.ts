import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StudentInfoComponent } from "../pages/studentInfo/studentInfoComponent";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { StudentsComponent } from "../pages/students/studentsComponent";
import { AdminsComponent } from "../pages/admins/admins.component";
import {NgxPaginationModule} from 'ngx-pagination';
import {MatTabsModule} from '@angular/material/tabs';
import {SlideshowModule} from 'ng-simple-slideshow';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    NgxPaginationModule,
    NgbModule,
    SlideshowModule,
    MatTabsModule,
    MatIconModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [
    DashboardComponent,
    StudentsComponent,
    AdminsComponent,
    StudentInfoComponent
  ]
})
export class AdminLayoutModule {}
