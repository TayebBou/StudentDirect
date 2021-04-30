import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
//import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/crud/student.service';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/student';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: 'students.component.html',
  encapsulation: ViewEncapsulation.None
})

export class StudentsComponent implements OnInit {
  public tableStudent: Student[];
  addForm: FormGroup;
  students = true;
  formStudents = false;
  cinCheck = false;
  firstNameCheck = false;
  lastNameCheck = false;
  levelCheck = false;
  specialtyCheck = false;
  sexeCheck = false;
  emailCheck = false;
  numberPhoneCheck = false;
  crudTitle = "Ajout d'étudiant";
  operationButton = "Ajouter";
  idEdit: String;

  constructor(private fb: FormBuilder, private router: Router, private studentService: StudentService, private toastr: ToastrService) {
    this.addForm = this.createForm();
  }
  initForm() {
    this.cinCheck = false;
    this.firstNameCheck = false;
    this.lastNameCheck = false;
    this.levelCheck = false;
    this.specialtyCheck = false;
    this.sexeCheck = false;
    this.emailCheck = false;
    this.numberPhoneCheck = false;
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
  functionRedirect() {
    if (this.operationButton == "Ajouter") {
      this.addStudent();
    } else {
      console.log(this.addForm.value);
      this.updateStudent(this.idEdit, this.addForm.value);
    }
  }
  foo() {
    this.crudTitle = "Ajout d'étudiant";
    this.operationButton = "Ajouter";
    this.initForm();
    this.addForm = this.createForm();
    this.students = false;
    this.formStudents = true;
  }
  retour() {
    this.students = true;
    this.formStudents = false;
  }
  ngOnInit() {

    this.refresh();
  }
  refresh() {
    try {
      this.studentService.readStudents().subscribe(response => {
        this.tableStudent = response;
      });
    } catch (error) {
      return console.log(error);
    }
  }
  editStudent(index: number, row: Student) {
    this.crudTitle = "Modification d'étudiant";
    this.operationButton = "Modifier";
    this.initForm();
    this.students = false;
    this.formStudents = true;
    this.addForm = this.createFormEdit(row);
    this.idEdit = row.id;
  }
  updateStudent(id: String, row: Student) {
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
    if (!this.addForm.value.level) {
      this.levelCheck = true;
    } else {
      this.levelCheck = false;
    }
    if (!this.addForm.value.specialty) {
      this.specialtyCheck = true;
    } else {
      this.specialtyCheck = false;
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
    if (this.addForm.value.cin && this.addForm.value.firstName && this.addForm.value.lastName && this.addForm.value.sexe && this.addForm.value.email && this.addForm.value.level && this.addForm.value.specialty && this.addForm.value.numberPhone) {
      this.studentService.updateStudent(id, this.addForm.value).subscribe(async response => {
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
  deleteStudent(index: number, row: Student) {
    this.studentService.deleteStudent(row.id).subscribe(async response => {
      this.toastMsg('Etudiant supprimé', 'succes');
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
      cin: new FormControl(''),
      lastName: new FormControl(''),
      firstName: new FormControl(''),
      sexe: new FormControl(''),
      specialty: new FormControl('Aucune specialite'),
      email: new FormControl(''),
      level: new FormControl(''),
      numberPhone: new FormControl(''),
    });
  }
  createFormEdit(student: Student) {
    return this.fb.group({
      cin: new FormControl(student.cin),
      lastName: new FormControl(student.lastName),
      firstName: new FormControl(student.firstName),
      sexe: new FormControl(student.sexe),
      specialty: new FormControl(student.specialty),
      email: new FormControl(student.email),
      level: new FormControl(student.level),
      numberPhone: new FormControl(student.numberPhone),
    });
  }
  addStudent() {
    this.addForm.value.cin = this.addForm.value.cin.toUpperCase();
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
    if (!this.addForm.value.level) {
      this.levelCheck = true;
    } else {
      this.levelCheck = false;
    }
    if (!this.addForm.value.specialty) {
      this.specialtyCheck = true;
    } else {
      this.specialtyCheck = false;
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

    if (this.addForm.value.cin && this.addForm.value.firstName && this.addForm.value.lastName && this.addForm.value.sexe && this.addForm.value.email && this.addForm.value.level && this.addForm.value.specialty && this.addForm.value.numberPhone) {

      this.studentService.createStudent(this.addForm.value).subscribe(async response => {
        this.addForm.reset();
        this.addForm = this.fb.group({
          specialty: new FormControl('Aucune specialite')
        });
        this.toastMsg('Etudiant ajouté', 'succes');
        await this.refresh();
        this.addForm = this.createForm();
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
  fetchStudent(index: number, row: Student){
    console.log(row.id);
    this.router.navigate(['studentInfo/', row.id]);
  }
}