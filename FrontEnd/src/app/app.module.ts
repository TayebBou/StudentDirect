import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { GlobalInterceptor } from './Interceptor/global.interceptor';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent , AuthLayoutComponent ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
