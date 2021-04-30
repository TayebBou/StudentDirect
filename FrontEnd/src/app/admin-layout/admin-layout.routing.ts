import { Routes } from "@angular/router";

import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { StudentsComponent } from "../pages/students/studentsComponent";
import { AdminsComponent } from "../pages/admins/admins.component";
import { StudentInfoComponent } from "../pages/studentInfo/studentInfoComponent";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "students", component: StudentsComponent },
  { path: "admins", component: AdminsComponent },
  { path: "studentInfo/:id", component: StudentInfoComponent }
];
