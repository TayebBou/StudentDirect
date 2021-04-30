import { Component, OnInit, NgModule, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
//import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addStudent',
  templateUrl: './addStudent.component.html'
})
export class addStudentComponent implements OnInit {

  addForm: FormGroup;
  cinCheck = false;
  firstNameCheck = false;
  lastNameCheck = false;
  sexeCheck = false;
  emailCheck = false;
  numberPhoneCheck = false;
  //tableStudents: Student[];

  constructor(private fb: FormBuilder, private studentService: StudentService, private toastr: ToastrService) {
    this.addForm = this.createForm();
    console.log(this.addForm);
  }

  ngOnInit() {
    //this.tableStudents = this.srE.tableStudents;
  }

  createForm() {
    return this.fb.group({
      cin: new FormControl(''),
      lastName: new FormControl(''),
      firstName: new FormControl(''),
      sexe: new FormControl(''),
      specialty: new FormControl('Aucune specialite'),
      email: new FormControl(''),
      numberPhone: new FormControl(''),
    });
  }
  addStudent() {
    if (!this.addForm.value.cin) {
      this.cinCheck = true;
    } else {
      this.cinCheck = false;
    }
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
    if (!this.addForm.value.sexe) {
      this.sexeCheck = true;
    } else {
      this.sexeCheck = false;
    }
    if (!this.addForm.value.email) {
      this.emailCheck = true;
    } else {
      this.emailCheck = false;
    }
    if (!this.addForm.value.numberPhone) {
      this.numberPhoneCheck = true;
    } else {
      this.numberPhoneCheck = false;
    }
    if (this.addForm.value.cin && this.addForm.value.firstName && this.addForm.value.lastName && this.addForm.value.sexe && this.addForm.value.sexe && this.addForm.value.email && this.addForm.value.numberPhone) {
      try {
        this.studentService.createStudent(this.addForm.value).subscribe(response => {
          console.log(response);
          this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> <b>Succés</b> - Etudiant ajouté', '', {
            disableTimeOut: true,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: 'toast-' + 'top' + '-' + 'center'
          });
        }, (error) => {
          console.log(this.addForm.value);

          console.log(error);
          if (error.error.msg) {
            this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> <b>Erreur</b> - ' + error.error.msg, '', {
              disableTimeOut: true,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-danger alert-with-icon",
              positionClass: 'toast-' + 'top' + '-' + 'center'
            });
          } else {
            if (error.error.errmsg) {
              this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> <b>Erreur</b> - ' + error.error.errmsg, '', {
                disableTimeOut: true,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: 'toast-' + 'top' + '-' + 'center'
              });
            } else {
              this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> <b>Erreur</b> - ' + error.error, '', {
                disableTimeOut: true,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: 'toast-' + 'top' + '-' + 'center'
              });
            }
          }
          });
      } catch (error) {
        return console.log(error);
      }
    }
  }
}
