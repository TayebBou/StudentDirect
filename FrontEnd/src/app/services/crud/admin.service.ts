import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdmin, Admin } from '../../models/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  tableAdmins: Admin[] = [];
  endpoint: string = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient
  ) { }

  // CREATE
  createAdmin(adminToCreate: IAdmin): Observable<IAdmin[]> {
    return this.http.post<IAdmin[]>(`${this.endpoint}/accounts`, adminToCreate);
  }

  // READ
  readAdmins(): Observable<IAdmin[]> {
    return this.http.get<IAdmin[]>(`${this.endpoint}/accounts`);
  }

  // UPDATE
  updateAdmin(idObject: String, adminToUpdate: IAdmin): Observable<IAdmin[]> {
    return this.http.put<IAdmin[]>(`${this.endpoint}/accounts/${idObject}`, adminToUpdate);
  }

  // DELETE 
  deleteAdmin(idObject: String): Observable<IAdmin[]> {
    return this.http.delete<IAdmin[]>(`${this.endpoint}/accounts/${idObject}`);
  }
}