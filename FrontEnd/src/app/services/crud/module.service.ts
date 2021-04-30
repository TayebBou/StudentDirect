import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module, IModule } from 'src/app/models/module';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  tableModules: Module[] = [];
  endpoint: string = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient
  ) { }

  // CREATE
  createModule(moduleToCreate: IModule): Observable<IModule[]> {
    return this.http.post<IModule[]>(`${this.endpoint}/modules`, moduleToCreate);
  }

  // READ
  readModules(studentId: String): Observable<IModule[]> {
    return this.http.get<IModule[]>(`${this.endpoint}/modules?studentId=` + studentId);
  }

  // UPDATE
  updateModule(idObject: String, moduleToUpdate: IModule): Observable<IModule[]> {
    return this.http.put<IModule[]>(`${this.endpoint}/modules/${idObject}`, moduleToUpdate);
  }

  // DELETE
  deleteModule(idObject: String): Observable<IModule[]> {
    return this.http.delete<IModule[]>(`${this.endpoint}/modules/${idObject}`);
  }
}