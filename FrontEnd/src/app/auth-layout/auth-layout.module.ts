import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthLayoutRoutes } from "./auth-layout.routing";
import { LoginComponent } from "../pages/auth-pages/login/loginComponent";
import { PassForgetComponent } from "../pages/auth-pages/passForget/passForgetComponent";
import { ResetPasswordComponent } from "../pages/auth-pages/resetPassword/resetPassword.Component";
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    NgxPaginationModule,
    NgbModule,
    MatIconModule,
  ],
  declarations: [
    LoginComponent,
    PassForgetComponent,
    ResetPasswordComponent
  ]
})
export class AuthLayoutModule {}
