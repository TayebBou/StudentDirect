import { Routes } from "@angular/router";

import { LoginComponent } from "../pages/auth-pages/login/loginComponent";
import { PassForgetComponent } from "../pages/auth-pages/passForget/passForgetComponent";
import { ResetPasswordComponent } from "../pages/auth-pages/resetPassword/resetPassword.Component";

export const AuthLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "passForget", component: PassForgetComponent },
  { path: "resetPassword/:id", component: ResetPasswordComponent }
];
