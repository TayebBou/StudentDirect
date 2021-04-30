import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
//import { Student } from 'src/app/models/student';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/crud/student.service';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/student';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Payment } from 'src/app/models/payment';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { PaymentService } from 'src/app/services/crud/payment.service';
import { AbsenceService } from 'src/app/services/crud/absence.service';
import { Absence } from 'src/app/models/absence';
import { Delay } from 'src/app/models/delay';
import { DelayService } from 'src/app/services/crud/delay.service';
import { Module } from 'src/app/models/module';
import { ModuleService } from 'src/app/services/crud/module.service';
import { Matter } from 'src/app/models/matter';
import { Exam } from 'src/app/models/exam';
import { ExamService } from 'src/app/services/crud/exam.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-studentInfo',
  templateUrl: 'studentInfo.component.html',
  encapsulation: ViewEncapsulation.None
})

export class StudentInfoComponent implements OnInit {

  id: String;
  operationButton = "Ajouter";
  heure: number;
  day: number;
  // PAYMENT CRUD VARIABLE DECLARATION//
  public tablePayment: Payment[];
  datetimeNow = new Date();
  paymentForm: FormGroup;
  payments = true;
  vals: String[];
  formPayments = false;
  paymentDateCheck = false;
  modePaymentCheck = false;
  amountPaidCheck = false;
  crudTitle = "Ajout versement";
  idEdit: String;
  // ABSENCE CRUD VARIABLE DECLARATION//
  public tableAbsence: Absence[];
  absenceForm: FormGroup;
  absences = true;
  formAbsences = false;
  sessionACheck = false;
  matterACheck = false;
  dateACheck = false;
  justificationCheck = false;
  crudTitleA = "Ajout d'absence";
  idEditA: String;
  // DELAY CRUD VARIABLE DECLARATION//
  public tableDelay: Delay[];
  delayForm: FormGroup;
  delays = true;
  formDelays = false;
  sessionDCheck = false;
  matterDCheck = false;
  dateDCheck = false;
  reasonDelayCheck = false;
  durationInMinCheck = false;
  crudTitleD = "Ajout de retard";
  idEditD: String;
  // MODULE CRUD VARIABLE DECLARATION//
  public tableModule: Module[];
  public matterss: Matter[];
  public tableExam: Exam[];
  moduleForm: FormGroup;
  examForm: FormGroup;
  matters: FormArray;
  mattersEdit: FormArray;
  modules = true;
  formModules = false;
  formExam = false;
  formModulesEdit = false;
  formModulesAdd = false;
  moduleNameCheck = false;
  levelCheck = false;
  matterNameFirstCheck = false;
  matterCoefficientFirstCheck = false;
  examNameCheck = false;
  examMarkCheck = false;
  crudTitleM = "Ajout de module";
  idEditM: String;
  idAddExam: String;

  constructor(private _Activatedroute: ActivatedRoute, private fb: FormBuilder, private router: Router, private paymentService: PaymentService, private delayService: DelayService, private absenceService: AbsenceService, private moduleService: ModuleService, private examService: ExamService, private toastr: ToastrService) {
    this.paymentForm = this.createForm();
    this.absenceForm = this.createFormA();
    this.delayForm = this.createFormD();
    this.moduleForm = this.createFormM();
  }
  ngOnInit() {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    console.log(this.id);
    this.refresh();
    this.refreshA();
    this.refreshD();
    this.refreshM();
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

  // PAYMENT CRUD //

  createForm() {
    return this.fb.group({
      paymentDate: new FormControl(''),
      modePayment: new FormControl('Espèces'),
      amountPaid: new FormControl('')
    });
  }
  initForm() {
    this.paymentDateCheck = false;
    this.modePaymentCheck = false;
    this.amountPaidCheck = false;
  }
  foo() {
    this.crudTitle = "Ajout versement";
    this.operationButton = "Ajouter";
    this.initForm();
    this.paymentForm = this.createForm();
    this.payments = false;
    this.formPayments = true;
  }
  retour() {
    this.payments = true;
    this.formPayments = false;
  }
  refresh() {
    try {
      this.paymentService.readPayments(this.id).subscribe(response => {
        this.tablePayment = response;
      });
    } catch (error) {
      return console.log(error);
    }
  }
  functionRedirect() {
    if (this.operationButton == "Ajouter") {
      this.addPayment();
    } else {
      console.log(this.paymentForm.value);
      this.updatePayment(this.idEdit, this.paymentForm.value);
    }
  }
  addPayment() {
    if (!this.paymentForm.value.paymentDate) {
      this.paymentDateCheck = true;
    } else {
      this.paymentDateCheck = false;
    }
    if (!this.paymentForm.value.modePayment) {
      this.modePaymentCheck = true;
    } else {
      this.modePaymentCheck = false;
    }
    if (!this.paymentForm.value.amountPaid) {
      this.amountPaidCheck = true;
    } else {
      this.amountPaidCheck = false;
    }
    console.log(this.paymentForm.value.paymentDate);
    if (this.paymentForm.value.paymentDate && this.paymentForm.value.modePayment && this.paymentForm.value.amountPaid) {
      console.log(this.paymentForm.value.paymentDate);

      this.paymentService.createPayement({
        paymentDate: this.paymentForm.value.paymentDate,
        modePayment: this.paymentForm.value.modePayment,
        amountPaid: this.paymentForm.value.amountPaid,
        studentId: this.id
      }).subscribe(async response => {
        this.paymentForm.reset();
        this.toastMsg('Versement ajouté', 'succes');
        await this.refresh();
        this.paymentForm = this.createForm();
      }, (error) => {
        console.log(this.paymentForm.value);
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
  updatePayment(id: String, row: Payment) {
    if (!this.paymentForm.value.paymentDate) {
      this.paymentDateCheck = true;
    } else {
      this.paymentDateCheck = false;
    }
    if (!this.paymentForm.value.modePayment) {
      this.modePaymentCheck = true;
    } else {
      this.modePaymentCheck = false;
    }
    if (!this.paymentForm.value.amountPaid) {
      this.amountPaidCheck = true;
    } else {
      this.amountPaidCheck = false;
    }
    if (this.paymentForm.value.paymentDate && this.paymentForm.value.modePayment && this.paymentForm.value.amountPaid) {

      this.paymentService.updatePayment(id, this.paymentForm.value).subscribe(async response => {
        this.toastMsg('Versement modifié', 'succes');
        await this.refresh();
      }, (error) => {
        console.log(this.paymentForm.value);
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
  createFormEdit(payment: Payment) {
    const s = payment.paymentDate.toString().replace(',', ' ').replace(':', ' ').replace(':', ' ');
    this.vals = s.split(" ")
    console.log(+this.vals[0]);

    if (this.vals[8] == "PM") {
      if (+this.vals[6] == 12) {
        this.heure = +this.vals[6];
      } else {
        this.heure = +this.vals[6] + 12;
      }

      return this.fb.group({
        paymentDate: new FormControl(new Date(+this.vals[4], +this.vals[2] - 1, +this.vals[0], this.heure, +this.vals[7])),
        modePayment: new FormControl(payment.modePayment),
        amountPaid: new FormControl(payment.amountPaid)
      });
    }
    if (+this.vals[6] == 12) {
      this.heure = +this.vals[6] + 12;
      this.day = +this.vals[0] - 1;
    } else {
      this.heure = +this.vals[6];
      this.day = +this.vals[0];
    }
    return this.fb.group({
      paymentDate: new FormControl(new Date(+this.vals[4], +this.vals[2] - 1, this.day, this.heure, +this.vals[7])),
      modePayment: new FormControl(payment.modePayment),
      amountPaid: new FormControl(payment.amountPaid)
    });
  }
  editPayment(index: number, row: Payment) {
    this.crudTitle = "Modification du versement";
    this.operationButton = "Modifier";
    this.initForm();
    this.payments = false;
    this.formPayments = true;
    this.paymentForm = this.createFormEdit(row);
    this.idEdit = row.id;
  }
  deletePayment(index: number, row: Payment) {
    this.paymentService.deletePayment(row.id).subscribe(async response => {
      this.toastMsg('Versement supprimé', 'succes');
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

  // ABSENCE CRUD //

  createFormA() {
    return this.fb.group({
      session: new FormControl('1'),
      date: new FormControl(''),
      matter: new FormControl(''),
      justification: new FormControl('Non justifiée')
    });
  }
  initFormA() {
    this.sessionACheck = false;
    this.matterACheck = false;
    this.dateACheck = false;
    this.justificationCheck = false;
  }
  fooA() {
    this.crudTitle = "Ajout d'absence";
    this.operationButton = "Ajouter";
    this.initFormA();
    this.absenceForm = this.createFormA();
    this.absences = false;
    this.formAbsences = true;
  }
  retourA() {
    this.absences = true;
    this.formAbsences = false;
  }
  refreshA() {
    try {
      this.absenceService.readAbsences(this.id).subscribe(response => {
        this.tableAbsence = response;
      });
    } catch (error) {
      return console.log(error);
    }
  }
  functionRedirectA() {
    if (this.operationButton == "Ajouter") {
      this.addAbsence();
    } else {
      console.log(this.absenceForm.value);
      this.updateAbsence(this.idEdit, this.absenceForm.value);
    }
  }
  addAbsence() {
    if (!this.absenceForm.value.session) {
      this.sessionACheck = true;
    } else {
      this.sessionACheck = false;
    }
    if (!this.absenceForm.value.date) {
      this.dateACheck = true;
    } else {
      this.dateACheck = false;
    }
    if (!this.absenceForm.value.matter) {
      this.matterACheck = true;
    } else {
      this.matterACheck = false;
    }
    if (!this.absenceForm.value.justification) {
      this.justificationCheck = true;
    } else {
      this.justificationCheck = false;
    }
    console.log(this.absenceForm.value.date);

    if (this.absenceForm.value.session && this.absenceForm.value.matter && this.absenceForm.value.date && this.absenceForm.value.justification) {

      this.absenceService.createAbsence({
        session: this.absenceForm.value.session,
        matter: this.absenceForm.value.matter,
        date: this.absenceForm.value.date,
        justification: this.absenceForm.value.justification,
        studentId: this.id
      }).subscribe(async response => {
        this.absenceForm.reset();
        this.toastMsg('Absence ajouté', 'succes');
        await this.refreshA();
        this.absenceForm = this.createFormA();
      }, (error) => {
        console.log(this.absenceForm.value);
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
  updateAbsence(id: String, row: Absence) {
    if (!this.absenceForm.value.session) {
      this.sessionACheck = true;
    } else {
      this.sessionACheck = false;
    }
    if (!this.absenceForm.value.date) {
      this.dateACheck = true;
    } else {
      this.dateACheck = false;
    }
    if (!this.absenceForm.value.matter) {
      this.matterACheck = true;
    } else {
      this.matterACheck = false;
    }
    if (!this.absenceForm.value.justification) {
      this.justificationCheck = true;
    } else {
      this.justificationCheck = false;
    }
    if (this.absenceForm.value.session && this.absenceForm.value.matter && this.absenceForm.value.date && this.absenceForm.value.justification) {

      this.absenceService.updateAbsence(id, this.absenceForm.value).subscribe(async response => {
        this.toastMsg('Absence modifié', 'succes');
        await this.refreshA();
      }, (error) => {
        console.log(this.absenceForm.value);
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
  createFormEditA(absence: Absence) {
    const s = absence.date.toString().replace(',', ' ').replace(':', ' ').replace(':', ' ');
    this.vals = s.split(" ")
    if (this.vals[8] == "PM") {
      if (+this.vals[6] == 12) {
        this.heure = +this.vals[6];
      } else {
        this.heure = +this.vals[6] + 12;
      }
      return this.fb.group({
        date: new FormControl(new Date(+this.vals[4], +this.vals[2] - 1, +this.vals[0], this.heure, +this.vals[7])),
        session: new FormControl(absence.session),
        justification: new FormControl(absence.justification),
        matter: new FormControl(absence.matter),
      });
    }
    if (+this.vals[6] == 12) {
      this.heure = +this.vals[6] + 12;
      this.day = +this.vals[0] - 1;
    } else {
      this.heure = +this.vals[6];
      this.day = +this.vals[0];
    }
    return this.fb.group({
      date: new FormControl(new Date(+this.vals[4], +this.vals[2] - 1, this.day, this.heure, +this.vals[7])),
      session: new FormControl(absence.session),
      justification: new FormControl(absence.justification),
      matter: new FormControl(absence.matter),
    });
  }
  editAbsence(index: number, row: Absence) {
    this.crudTitle = "Modification d'absence";
    this.operationButton = "Modifier";
    this.initFormA();
    this.absences = false;
    this.formAbsences = true;
    this.absenceForm = this.createFormEditA(row);
    this.idEdit = row.id;
  }
  deleteAbsence(index: number, row: Absence) {
    this.absenceService.deleteAbsence(row.id).subscribe(async response => {
      this.toastMsg('Absence supprimé', 'succes');
      await this.refreshA();
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

  // DELAY CRUD //

  createFormD() {
    return this.fb.group({
      session: new FormControl('1'),
      matter: new FormControl(''),
      date: new FormControl(''),
      durationInMin: new FormControl('5'),
      reasonDelay: new FormControl('Raison non spécifiée')
    });
  }
  initFormD() {
    this.sessionDCheck = false;
    this.matterDCheck = false;
    this.dateDCheck = false;
    this.reasonDelayCheck = false;
    this.durationInMinCheck = false;
  }
  fooD() {
    this.crudTitle = "Ajout de retard";
    this.operationButton = "Ajouter";
    this.initFormD();
    this.delayForm = this.createFormD();
    this.delays = false;
    this.formDelays = true;
  }
  retourD() {
    this.delays = true;
    this.formDelays = false;
  }
  refreshD() {
    try {
      this.delayService.readDelays(this.id).subscribe(response => {
        this.tableDelay = response;
      });
    } catch (error) {
      return console.log(error);
    }
  }
  functionRedirectD() {
    if (this.operationButton == "Ajouter") {
      this.addDelay();
    } else {
      console.log(this.absenceForm.value);
      this.updateDelay(this.idEdit, this.delayForm.value);
    }
  }
  addDelay() {
    if (!this.delayForm.value.session) {
      this.sessionDCheck = true;
    } else {
      this.sessionDCheck = false;
    }
    if (!this.delayForm.value.date) {
      this.dateDCheck = true;
    } else {
      this.dateDCheck = false;
    }
    if (!this.delayForm.value.matter) {
      this.matterDCheck = true;
    } else {
      this.matterDCheck = false;
    }
    if (!this.delayForm.value.reasonDelay) {
      this.reasonDelayCheck = true;
    } else {
      this.reasonDelayCheck = false;
    }
    if (!this.delayForm.value.durationInMin) {
      this.durationInMinCheck = true;
    } else {
      this.durationInMinCheck = false;
    }
    if (this.delayForm.value.session && this.delayForm.value.matter && this.delayForm.value.date && this.delayForm.value.durationInMin && this.delayForm.value.reasonDelay) {
      console.log(this.delayForm.value.date);

      this.delayService.createDelay({
        session: this.delayForm.value.session,
        matter: this.delayForm.value.matter,
        date: this.delayForm.value.date,
        durationInMin: this.delayForm.value.durationInMin,
        reasonDelay: this.delayForm.value.reasonDelay,
        studentId: this.id
      }).subscribe(async response => {
        this.delayForm.reset();
        this.toastMsg('Retard ajouté', 'succes');
        await this.refreshD();
        this.delayForm = this.createFormD();
      }, (error) => {
        console.log(this.delayForm.value);
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
  updateDelay(id: String, row: Delay) {
    if (!this.delayForm.value.session) {
      this.sessionDCheck = true;
    } else {
      this.sessionDCheck = false;
    }
    if (!this.delayForm.value.date) {
      this.dateDCheck = true;
    } else {
      this.dateDCheck = false;
    }
    if (!this.delayForm.value.matter) {
      this.matterDCheck = true;
    } else {
      this.matterDCheck = false;
    }
    if (!this.delayForm.value.reasonDelay) {
      this.reasonDelayCheck = true;
    } else {
      this.reasonDelayCheck = false;
    }
    if (!this.delayForm.value.durationInMin) {
      this.durationInMinCheck = true;
    } else {
      this.durationInMinCheck = false;
    }
    if (this.delayForm.value.session && this.delayForm.value.matter && this.delayForm.value.date && this.delayForm.value.durationInMin && this.delayForm.value.reasonDelay) {

      this.delayService.updateDelay(id, this.delayForm.value).subscribe(async response => {
        this.toastMsg('Retard modifié', 'succes');
        await this.refreshD();
      }, (error) => {
        console.log(this.delayForm.value);
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
  createFormEditD(delay: Delay) {
    const s = delay.date.toString().replace(',', ' ').replace(':', ' ').replace(':', ' ');
    this.vals = s.split(" ")
    if (this.vals[8] == "PM") {
      if (+this.vals[6] == 12) {
        this.heure = +this.vals[6];
      } else {
        this.heure = +this.vals[6] + 12;
      }
      return this.fb.group({
        date: new FormControl(new Date(+this.vals[4], +this.vals[2] - 1, +this.vals[0], this.heure, +this.vals[7])),
        session: new FormControl(delay.session),
        reasonDelay: new FormControl(delay.reasonDelay),
        durationInMin: new FormControl(delay.durationInMin),
        matter: new FormControl(delay.matter),
      });
    }
    if (+this.vals[6] == 12) {
      this.heure = +this.vals[6] + 12;
      this.day = +this.vals[0] - 1;
    } else {
      this.heure = +this.vals[6];
      this.day = +this.vals[0];
    }
    return this.fb.group({
      date: new FormControl(new Date(+this.vals[4], +this.vals[2] - 1, this.day, this.heure, +this.vals[7])),
      session: new FormControl(delay.session),
      reasonDelay: new FormControl(delay.reasonDelay),
      durationInMin: new FormControl(delay.durationInMin),
      matter: new FormControl(delay.matter),
    });
  }
  editDelay(index: number, row: Delay) {
    this.crudTitle = "Modification du retard";
    this.operationButton = "Modifier";
    this.initFormD();
    this.delays = false;
    this.formDelays = true;
    this.delayForm = this.createFormEditD(row);
    this.idEdit = row.id;
  }
  deleteDelay(index: number, row: Delay) {
    this.delayService.deleteDelay(row.id).subscribe(async response => {
      this.toastMsg('Retard supprimé', 'succes');
      await this.refreshD();
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

  // Module CRUD

  createFormM() {
    return this.fb.group({
      moduleName: new FormControl(''),
      level: new FormControl(''),
      matters: new FormArray([this.fb.group({
        name: new FormControl(''),
        coefficient: new FormControl(''),
      })])
    });
  }
  cancel() {
    this.moduleForm = this.fb.group({
      moduleName: new FormControl(this.moduleForm.value.moduleName),
      level: new FormControl(this.moduleForm.value.level),
      matters: new FormArray([this.fb.group({
        name: new FormControl(this.moduleForm.value.matters[0].name),
        coefficient: new FormControl(this.moduleForm.value.matters[0].coefficient),
      })])
    });
  }
  addMatter() {
    this.matters = this.moduleForm.get('matters') as FormArray;
    this.matters.push(this.fb.group({
      name: new FormControl(''),
      coefficient: new FormControl(''),
    }));
  }
  initFormM() {
    this.moduleNameCheck = false;
    this.levelCheck = false;
    this.matterNameFirstCheck = false;
    this.matterCoefficientFirstCheck = false;
  }
  fooM() {
    this.crudTitle = "Ajout de module";
    this.operationButton = "Ajouter";
    this.initFormM();
    this.moduleForm = this.createFormM();
    this.modules = false;
    this.formModules = true;
    this.formModulesEdit = false;
    this.formModulesAdd = true;
  }
  retourM() {
    this.modules = true;
    this.formModules = false;
  }
  refreshM() {
    try {
      this.moduleService.readModules(this.id).subscribe(responseMo => {
        console.log(responseMo);
        let jmo: number = 0;
        responseMo.forEach(function (modules) {
          let Sam: number = 0;
          let SC: number = 0;
          let jm: number = 0;
          let AMo: number;
          modules.matters.forEach(function (matter) {
            let S: number = 0;
            let j: number = 0;
            let AM: number;
            matter.exams.forEach(function (exam) {
              S = S + exam.mark;
              j++;
            });
            SC = SC + matter.coefficient;
            AM = ( S / j );
            console.log(responseMo);
            responseMo[jmo].matters[jm].average = AM;
            console.log("ARRIVE ICI");

            Sam = Sam + (AM* matter.coefficient);
            jm++;
          });

          AMo = Sam / SC;
          responseMo[jmo].average = Number(AMo.toFixed(2));
          jmo++;
        });
        this.tableModule = responseMo;
        console.log(this.tableModule);
      });
      
      
    } catch (error) {
      return console.log(error);
    }
  }
  functionRedirectM() {
    if (this.operationButton == "Ajouter") {
      this.addModule();
    } else {
      console.log(this.absenceForm.value);
      this.updateModule(this.idEdit, this.delayForm.value);
    }
  }
  addModule() {
    if (!this.moduleForm.value.moduleName) {
      this.moduleNameCheck = true;
    } else {
      this.moduleNameCheck = false;
    }
    if (!this.moduleForm.value.level) {
      this.levelCheck = true;
    } else {
      this.levelCheck = false;
    }
    if (!this.moduleForm.value.matters[0].name) {
      this.matterNameFirstCheck = true;
    } else {
      this.matterNameFirstCheck = false;
    }
    if (!this.moduleForm.value.matters[0].coefficient) {
      this.matterCoefficientFirstCheck = true;
    } else {
      this.matterCoefficientFirstCheck = false;
    }
    if (this.moduleForm.value.moduleName && this.moduleForm.value.level && this.moduleForm.value.matters[0].name && this.moduleForm.value.matters[0].coefficient) {
      console.log(this.moduleForm.value.matters);
      this.moduleService.createModule({
        name: this.moduleForm.value.moduleName,
        level: this.moduleForm.value.level,
        matters: this.moduleForm.value.matters
      }).subscribe(async response => {
        this.moduleForm.reset();
        this.toastMsg('Module ajouté', 'succes');
        await this.refreshM();
        this.moduleForm = this.createFormM();
      }, (error) => {
        console.log(this.moduleForm.value);
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
  updateModule(id: String, row: Module) {
    if (!this.moduleForm.value.moduleName) {
      this.moduleNameCheck = true;
    } else {
      this.moduleNameCheck = false;
    }
    if (!this.moduleForm.value.level) {
      this.levelCheck = true;
    } else {
      this.levelCheck = false;
    }
    if (!this.moduleForm.value.mattersEdit[0].name) {
      this.matterNameFirstCheck = true;
    } else {
      this.matterNameFirstCheck = false;
    }
    if (!this.moduleForm.value.mattersEdit[0].coefficient) {
      this.matterCoefficientFirstCheck = true;
    } else {
      this.matterCoefficientFirstCheck = false;
    }
    if (this.moduleForm.value.moduleName && this.moduleForm.value.level && this.moduleForm.value.mattersEdit[0].name && this.moduleForm.value.mattersEdit[0].coefficient) {
      console.log(this.moduleForm.value);
      
      this.moduleService.updateModule(id, {
        name: this.moduleForm.value.moduleName,
        level: this.moduleForm.value.level,
        matters: this.moduleForm.value.mattersEdit
      }).subscribe(async response => {
        this.toastMsg('Module modifié', 'succes');
        await this.refreshM();
      }, (error) => {
        console.log(this.moduleForm.value);
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
  createFormEditM(modulee: Module) {
    console.log(this.moduleForm);
    
    this.moduleForm = this.fb.group({
      moduleName: new FormControl(''),
      level: new FormControl(''),
      matters: new FormArray([])
    });
    this.mattersEdit = this.moduleForm.controls.matters as FormArray;
    
    modulee.matters.forEach(matter => {
      this.mattersEdit.push(this.fb.group({ name: matter.name, coefficient: matter.coefficient, _id: matter._id }))
    })
    console.log(this.moduleForm);
    console.log(this.mattersEdit);
    return this.fb.group({
      moduleName: new FormControl(modulee.name),
      level: new FormControl(modulee.level),
      mattersEdit: this.mattersEdit
    });
  }
  editModule(index: number, row: Module) {
    this.crudTitle = "Modification du module";
    this.operationButton = "Modifier";
    this.initFormM();
    this.modules = false;
    this.formModules = true;
    this.moduleForm = this.createFormEditM(row);
    this.idEdit = row._id;
    this.formModulesEdit = true;
    this.formModulesAdd = false;
    this.matterss = row.matters;
  }
  deleteModule(index: number, row: Module) {

    this.moduleService.deleteModule(row._id).subscribe(async response => {
      this.toastMsg('Retard supprimé', 'succes');
      await this.refreshM();
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

  // EXAM CRUD 

  createFormExam() {
    return this.fb.group({
      name: new FormControl(''),
      mark: new FormControl(''),
    });
  }
  retourExam() {
    this.modules = true;
    this.formModules = false;
    this.formExam = false;
  }
  initFormExam() {
    this.examNameCheck = false;
    this.examMarkCheck = false;
  }
  fooExam(row: Matter) {
    this.crudTitle = "Ajout d'exam";
    this.operationButton = "Ajouter";
    this.initFormExam();
    this.examForm = this.createFormExam();
    this.modules = false;
    this.formModules = false;
    this.formExam = true;
    this.idAddExam = row._id;
  }
  addExam() {
    if (!this.examForm.value.name) {
      this.examNameCheck = true;
    } else {
      this.examNameCheck = false;
    }
    if (!this.examForm.value.mark) {
      this.examMarkCheck = true;
    } else {
      this.examMarkCheck = false;
    }
    if (this.examForm.value.name && this.examForm.value.mark) {
      this.examService.createExam({
        name: this.examForm.value.name,
        mark: this.examForm.value.mark,
        studentId: this.id,
        matterId: this.idAddExam
      }).subscribe(async response => {
        this.examForm.reset();
        this.toastMsg('Examen ajouté', 'succes');
        await this.refreshM();
        this.examForm = this.createFormExam();
      }, (error) => {
        console.log(this.examForm.value);
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
  deleteExam(index: number, row: Exam) {
    this.examService.deleteExam(row._id).subscribe(async response => {
      this.toastMsg('Exam supprimé', 'succes');
      await this.refreshM();
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