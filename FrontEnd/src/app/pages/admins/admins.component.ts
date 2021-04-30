import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
//import { Student } from 'src/app/models/student';
import { AdminService } from 'src/app/services/crud/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/models/admin';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admins',
  templateUrl: 'admins.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AdminsComponent implements OnInit {
  public tableAdmins: Admin[];
  p: number = 1;
  addForm: FormGroup;
  editPass: Admin;
  admins = true;
  passwordLabel: String;
  formAdmins = false;
  firstNameCheck = false;
  lastNameCheck = false;
  passwordConfirmMsg: String;
  typeAlert: String;
  emailCheck = false;
  confirmPasswordEqualCheck = false;
  loginCheck = false;
  confirmPasswordCheck = false;
  passwordCheck = false;
  crudTitle = "Ajout d'administrateur";
  operationButton = "Ajouter";
  idEdit: String;
  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminService, private toastr: ToastrService) {
    this.addForm = this.createForm();
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
  initForm() {
    this.firstNameCheck = false;
    this.lastNameCheck = false;
    this.emailCheck = false;
    this.confirmPasswordEqualCheck = false;
    this.loginCheck = false;
    this.confirmPasswordCheck = false;
    this.passwordCheck = false;
  }
  functionRedirect() {
    if (this.operationButton == "Ajouter") {
      this.addAdmin();
    } else {
      console.log(this.addForm.value);
      this.updateAdmin(this.idEdit, this.addForm.value);
    }
  }
  foo() {
    this.crudTitle = "Ajout d'administrateur";
    this.operationButton = "Ajouter";
    this.passwordLabel = "Mot de passe";
    this.initForm();
    this.addForm = this.createForm();
    this.addForm.controls['confirmPassword'].disable();
    this.admins = false;
    this.formAdmins = true;
  }
  retour() {
    this.admins = true;
    this.formAdmins = false;
  }
  ngOnInit() {

    this.refresh();
  }
  refresh() {
    try {
      this.adminService.readAdmins().subscribe(response => {
        this.tableAdmins = response;
      });
    } catch (error) {
      return console.log(error);
    }
  }
  editAdmin(index: number, row: Admin) {
    this.crudTitle = "Modification d'administrateur";
    this.operationButton = "Modifier";
    this.passwordLabel = "Nouveau mot de passe";
    this.initForm();
    this.admins = false;
    this.formAdmins = true;
    this.addForm = this.createFormEdit(row);
    this.addForm.controls['confirmPassword'].disable();
    this.idEdit = row.id;
    
  }
  updateAdmin(id: String, row: Admin) {
    if (!this.addForm.value.firstName) {
      this.firstNameCheck = true;
    } else {
      this.firstNameCheck = false;
    }
    if (!this.addForm.value.lastName) {
      this.lastNameCheck = true;
    } else {
      this.lastNameCheck = false;
    }
    if (!this.addForm.value.email) {
      this.emailCheck = true;
    } else {
      this.emailCheck = false;
    }
    if (!this.addForm.value.login) {
      this.loginCheck = true;
    } else {
      this.loginCheck = false;
    }
    
    if (!this.addForm.value.password) {
      this.editPass = {
        firstName: this.addForm.value.firstName,
        lastName: this.addForm.value.lastName,
        email: this.addForm.value.email,
        login: this.addForm.value.login
      }
    } else {
      this.editPass = {
        firstName: this.addForm.value.firstName,
        lastName: this.addForm.value.lastName,
        email: this.addForm.value.email,
        login: this.addForm.value.login,
        password: this.addForm.value.password
      };
      this.confirmPasswordCheck = true;
      if (!this.addForm.value.confirmPassword) {
        this.confirmPasswordEqualCheck = false;
      } else {
        this.confirmPasswordCheck = false;
        if (this.addForm.value.confirmPassword != this.addForm.value.password) {
          this.confirmPasswordEqualCheck = true;
          this.typeAlert = 'danger';
          this.passwordConfirmMsg = 'Votre mot de passe ne correspond pas !';
        } else {
          this.confirmPasswordEqualCheck = false;
        }
      }
    }

    if (this.addForm.value.firstName && this.addForm.value.lastName && this.addForm.value.email && this.addForm.value.login && !this.confirmPasswordEqualCheck && !this.confirmPasswordCheck) {
      this.adminService.updateAdmin(id, this.editPass).subscribe(async response => {
        this.toastMsg('Modification faites', 'succes');
        await this.refresh();
      }, (error) => {

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
  onKey() { // with type info
    if(!this.addForm.value.password){
      this.addForm = this.createFormEdit(this.addForm.value);
      setTimeout(() => this.addForm.controls['confirmPassword'].disable());
    }else{
      this.addForm.controls['confirmPassword'].enable();
    }
  }
  deleteAdmin(index: number, row: Admin) {

    this.adminService.deleteAdmin(row.id).subscribe(async response => {
      this.toastMsg('Administrateur supprimé', 'succes');
      await this.refresh();
    }, (error) => {
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
  createForm() {
    return this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      login: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }
  createFormEdit(admin: Admin) {
    return this.fb.group({
      lastName: new FormControl(admin.lastName),
      firstName: new FormControl(admin.firstName),
      email: new FormControl(admin.email),
      login: new FormControl(admin.login),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }
  addAdmin() {
    if (!this.addForm.value.firstName) {
      this.firstNameCheck = true;
    } else {
      this.firstNameCheck = false;
    }
    if (!this.addForm.value.lastName) {
      this.lastNameCheck = true;
    } else {
      this.lastNameCheck = false;
    }
    if (!this.addForm.value.email) {
      this.emailCheck = true;
    } else {
      this.emailCheck = false;
    }
    if (!this.addForm.value.login) {
      this.loginCheck = true;
    } else {
      this.loginCheck = false;
    }

    if (!this.addForm.value.confirmPassword) {
      this.confirmPasswordCheck = true;
      this.confirmPasswordEqualCheck = false;
    } else {
      this.confirmPasswordCheck = false;
      if (this.addForm.value.confirmPassword != this.addForm.value.password) {
        this.confirmPasswordEqualCheck = true;
        this.typeAlert = 'danger';
        this.passwordConfirmMsg = 'Votre mot de passe ne correspond pas !';
      } else {
        this.confirmPasswordEqualCheck = false;
      }
    }
    if (!this.addForm.value.password) {
      this.passwordCheck = true;
    } else {
      this.passwordCheck = false;
    }

    if (this.addForm.value.firstName && this.addForm.value.lastName && this.addForm.value.email && this.addForm.value.login && this.addForm.value.password && this.addForm.value.confirmPassword && !this.confirmPasswordEqualCheck) {
      this.adminService.createAdmin({
        firstName: this.addForm.value.firstName,
        lastName: this.addForm.value.lastName,
        email: this.addForm.value.email,
        login: this.addForm.value.login,
        password: this.addForm.value.password
      }).subscribe(async response => {
        this.addForm.reset();
        this.addForm.controls['confirmPassword'].disable();
        this.toastMsg('Administrateur ajouté', 'succes');
        await this.refresh();
      }, (error) => {
        console.log(this.addForm.value);
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