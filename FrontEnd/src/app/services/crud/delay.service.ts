import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delay, IDelay } from 'src/app/models/delay';

@Injectable({
  providedIn: 'root',
})
export class DelayService {
  tableDelays: Delay[] = [];
  endpoint: string = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient
  ) { }

  // CREATE
  createDelay(delayToCreate: IDelay): Observable<IDelay[]> {
    return this.http.post<IDelay[]>(`${this.endpoint}/delays`, delayToCreate);
  }

  // READ
  readDelays(studentId: String): Observable<IDelay[]> {
    return this.http.get<IDelay[]>(`${this.endpoint}/delays?studentId=` + studentId);
  }

  // UPDATE
  updateDelay(idObject: String, delayToUpdate: IDelay): Observable<IDelay[]> {
    return this.http.put<IDelay[]>(`${this.endpoint}/delays/${idObject}`, delayToUpdate);
  }

  // DELETE
  deleteDelay(idObject: String): Observable<IDelay[]> {
    return this.http.delete<IDelay[]>(`${this.endpoint}/delays/${idObject}`);
  }
}