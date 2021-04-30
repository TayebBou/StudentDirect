import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam, IExam } from 'src/app/models/exam';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  tableExams: Exam[] = [];
  endpoint: string = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient
  ) { }

  // CREATE
  createExam(examToCreate: IExam): Observable<IExam[]> {
    return this.http.post<IExam[]>(`${this.endpoint}/exams`, examToCreate);
  }

  // DELETE
  deleteExam(idObject: String): Observable<IExam[]> {
    return this.http.delete<IExam[]>(`${this.endpoint}/exams/${idObject}`);
  }
}