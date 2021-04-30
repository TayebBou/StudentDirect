import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent, Student } from '../../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  endpoint: string = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient
  ) { }

  // CREATE
  createStudent(studentToCreate: IStudent): Observable<IStudent[]> {
    return this.http.post<IStudent[]>(`${this.endpoint}/students`, studentToCreate);
  }

  // READ
  readStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`${this.endpoint}/students`);
  }

  // UPDATE
  updateStudent(idObject: String, studentToUpdate: IStudent): Observable<IStudent[]> {
    return this.http.put<IStudent[]>(`${this.endpoint}/students/${idObject}`, studentToUpdate);
  }

  // DELETE 
  deleteStudent(idObject: String): Observable<IStudent[]> {
    return this.http.delete<IStudent[]>(`${this.endpoint}/students/${idObject}`);
  }
}