import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mark, IMark } from 'src/app/models/mark';

@Injectable({
  providedIn: 'root',
})
export class MarkService {
  tableMarks: Mark[] = [];
  endpoint: string = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient
  ) { }

  // CREATE
  createMark(markToCreate: IMark): Observable<IMark[]> {
    return this.http.post<IMark[]>(`${this.endpoint}/marks`, markToCreate);
  }

  // READ
  readMarks(studentId: String): Observable<IMark[]> {
    return this.http.get<IMark[]>(`${this.endpoint}/marks?studentId=` + studentId);
  }

  // UPDATE
  updateMark(idObject: String, markToUpdate: IMark): Observable<IMark[]> {
    return this.http.put<IMark[]>(`${this.endpoint}/marks/${idObject}`, markToUpdate);
  }

  // DELETE
  deleteMark(idObject: String): Observable<IMark[]> {
    return this.http.delete<IMark[]>(`${this.endpoint}/marks/${idObject}`);
  }
}