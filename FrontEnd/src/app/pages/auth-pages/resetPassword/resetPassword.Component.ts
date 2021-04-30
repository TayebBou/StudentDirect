import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
//import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/crud/student.service';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/student';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/authService';
import { VerifyTokenService } from 'src/app/services/token/verifyToken.service';

@Component({
  selector: 'app-resetPassword',
  templateUrl: 'resetPassword.component.html'
})

export class ResetPasswordComponent implements OnInit {
  token: String;
  resetPasswordForm: FormGroup;
  passwordCheck = false;
  passwordVerifyCheck = false;
  typeAlert: String;
  confirmPasswordEqualCheck = false;
  passwordConfirmMsg: String;

  constructor(private _Activatedroute: ActivatedRoute,private fb: FormBuilder, private router: Router, private verifyJwt: VerifyTokenService, private authService: AuthService, private toastr: ToastrService) {
    this.resetPasswordForm = this.createForm();
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
    this.token = this._Activatedroute.snapshot.paramMap.get("id");
  }
  createForm() {
    return this.fb.group({
      password: new FormControl(''),
      passwordVerify: new FormControl('')
    });
  }
  resetPassword() {
    if (!this.resetPasswordForm.value.password) {
      this.passwordCheck = true;
    } else {
      this.passwordCheck = false;
    }
    if (!this.resetPasswordForm.value.passwordVerify) {
      this.passwordVerifyCheck = true;
      this.confirmPasswordEqualCheck = false;
    } else {
      this.passwordVerifyCheck = false;
      if (this.resetPasswordForm.value.passwordVerify != this.resetPasswordForm.value.password) {
        this.confirmPasswordEqualCheck = true;
        this.typeAlert = 'danger';
        this.passwordConfirmMsg = 'Votre mot de passe ne correspond pas !';
      } else {
        this.confirmPasswordEqualCheck = false;
      }
    }

    if (this.resetPasswordForm.value.password && this.resetPasswordForm.value.passwordVerify && !this.confirmPasswordEqualCheck) {

      this.authService.resetPassword({password: this.resetPasswordForm.value.password, 
      token: this.token}).subscribe(async resp => {
        // RESET FORM
        await this.resetPasswordForm.reset();
        await this.toastMsg("Mot de passe modifié avec succès", 'succes');
        await this.router.navigateByUrl('/login');
      }, (error) => {
        console.log(this.resetPasswordForm.value);
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