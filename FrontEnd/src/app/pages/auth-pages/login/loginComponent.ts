import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { Router, Route } from '@angular/router';
//import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/crud/student.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { Student } from 'src/app/models/student';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/authService';
import { VerifyTokenService } from 'src/app/services/token/verifyToken.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginCheck = false;
  passwordCheck = false;

  constructor(private fb: FormBuilder, private router: Router, private verifyJwt: VerifyTokenService, private authService: AuthService, private toastr: ToastrService) {
    this.loginForm = this.createForm();
    console.log(this.loginForm);
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
      login: new FormControl(''),
      password: new FormControl('')
    });
  }
  loginPost() {
    if (!this.loginForm.value.login) {
      this.loginCheck = true;
    } else {
      this.loginCheck = false;
    }
    if (!this.loginForm.value.password) {
      this.passwordCheck = true;
    } else {
      this.passwordCheck = false;
    }

    if (this.loginForm.value.login && this.loginForm.value.password) {

      this.authService.loginStudent(this.loginForm.value).subscribe(async resp => {
        // RESET LOGIN FORM
        await this.loginForm.reset();
        // CHECK IF TOKEN EXIST
        if (resp.token) {
          // SET TOKEN IN LOCAL STORAGE
          await localStorage.setItem('token', resp.token);
          console.log(resp.token);
          
          // VERIFIE TOKEN
          this.verifyJwt.verifyToken({ token: resp.token }).subscribe(async response => {
            console.log(response);
            
            if (response) {
              // ADMIN CONNECTION
              if (jwtDecode(localStorage.getItem('token')).role == 'administrateur') {
                console.log('Auth est ADMIN');
                await this.router.navigateByUrl('/students');
                await this.toastMsg('Connecté', 'succes');
              } // STUDENT CONNECTION 
              else {
                console.log('Auth est STUDENT');
                await this.router.navigateByUrl('/students');
                await this.toastMsg('Connecté', 'succes');
              }
            } else {
              this.router.navigateByUrl('/login');
            }
          })
        }
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