import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence, IAbsence } from 'src/app/models/absence';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  tableAbsences: Absence[] = [];
  endpoint: string = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient
  ) { }

  // CREATE
  createAbsence(absenceToCreate: IAbsence): Observable<IAbsence[]> {
    return this.http.post<IAbsence[]>(`${this.endpoint}/absences`, absenceToCreate);
  }

  // READ
  readAbsences(studentId: String): Observable<IAbsence[]> {
    return this.http.get<IAbsence[]>(`${this.endpoint}/absences?studentId=` + studentId);
  }

  // UPDATE
  updateAbsence(idObject: String, absenceToUpdate: IAbsence): Observable<IAbsence[]> {
    return this.http.put<IAbsence[]>(`${this.endpoint}/absences/${idObject}`, absenceToUpdate);
  }

  // DELETE
  deleteAbsence(idObject: String): Observable<IAbsence[]> {
    return this.http.delete<IAbsence[]>(`${this.endpoint}/absences/${idObject}`);
  }
}