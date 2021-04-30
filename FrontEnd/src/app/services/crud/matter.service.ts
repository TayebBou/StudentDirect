import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matter, IMatter } from 'src/app/models/matter';

@Injectable({
  providedIn: 'root',
})
export class MatterService {
  tableMatters: Matter[] = [];
  endpoint: string = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient
  ) { }

  // CREATE
  createMatter(matterToCreate: IMatter): Observable<IMatter[]> {
    return this.http.post<IMatter[]>(`${this.endpoint}/matters`, matterToCreate);
  }

  // READ
  readMatters(studentId: String): Observable<IMatter[]> {
    return this.http.get<IMatter[]>(`${this.endpoint}/matters?moduleId=` + studentId);
  }

  // UPDATE
  updateMatter(idObject: String, matterToUpdate: IMatter): Observable<IMatter[]> {
    return this.http.put<IMatter[]>(`${this.endpoint}/matters/${idObject}`, matterToUpdate);
  }

  // DELETE
  deleteMatter(idObject: String): Observable<IMatter[]> {
    return this.http.delete<IMatter[]>(`${this.endpoint}/matters/${idObject}`);
  }
}