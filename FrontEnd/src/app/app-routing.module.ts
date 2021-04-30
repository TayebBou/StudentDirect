import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
    canLoad: [AuthGuardService]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./auth-layout/auth-layout.module#AuthLayoutModule"
      }
    ]
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./admin-layout/admin-layout.module#AdminLayoutModule",
        canLoad: [AuthGuardService]
      }
    ]
  }, {
    path: "**",
    redirectTo: "dashboard",
    canLoad: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
