import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment, IPayment } from 'src/app/models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  tablePayments: Payment[] = [];
  endpoint: string = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient
  ) { }

  // CREATE
  createPayement(paymentToCreate: IPayment): Observable<IPayment[]> {
    return this.http.post<IPayment[]>(`${this.endpoint}/payments`, paymentToCreate);
  }

  // READ
  readPayments(studentId: String): Observable<IPayment[]> {
    return this.http.get<IPayment[]>(`${this.endpoint}/payments?studentId=` + studentId);
  }

  // UPDATE
  updatePayment(idObject: String, paymentToUpdate: IPayment): Observable<IPayment[]> {
    return this.http.put<IPayment[]>(`${this.endpoint}/payments/${idObject}`, paymentToUpdate);
  }

  // DELETE 
  deletePayment(idObject: String): Observable<IPayment[]> {
    return this.http.delete<IPayment[]>(`${this.endpoint}/payments/${idObject}`);
  }
}