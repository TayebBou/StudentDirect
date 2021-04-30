import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/crud/student.service';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/student';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/authService';

@Component({
  selector: 'app-passForget',
  templateUrl: 'passForget.component.html'
})

export class PassForgetComponent implements OnInit {
  loginForm: FormGroup;
  forgetPassForm: FormGroup;
  emailCheck = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
    this.loginForm = this.createForm();
  }
  initForm() {
  }
  toastMsg(msg: String, type: String) {
    if (type == 'succes') {
      this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> <b>Succés</b> - ' + msg, '', {
        disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' + 'center'
      });
    }
    if (type == 'danger') {
      this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> <b>Erreur</b> - ' + msg, '', {
        disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' + 'center'
      });
    }
    if (type == 'warning') {
      this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> <b>Attention</b> - ' + msg, '', {
        disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' + 'center'
      });
    }
  }
  ngOnInit() {

  }
  createForm() {
    return this.fb.group({
      email: new FormControl('')
    });
  }
  loginPost() {
    if (!this.loginForm.value.email) {
      this.emailCheck = true;
    } else {
      this.emailCheck = false;
    }

    if (this.loginForm.value.email) {

      this.authService.passForget(this.loginForm.value).subscribe(async resp => {
        // RESET LOGIN FORM
        await this.loginForm.reset();
        await this.toastMsg("Un Email à été envoyé à l'adresse que vous avez saisie", 'succes');
      }, (error) => {
        console.log(this.loginForm.value);
        console.log(error);
        if (error.error.msg) {
          this.toastMsg(error.error.msg, 'danger');
        } else {
          if (error.error.errmsg) {
            this.toastMsg(error.error.errmsg, 'danger');
          } else {
            this.toastMsg(error.error, 'danger');
          }
        }
      });
    }
  }

}