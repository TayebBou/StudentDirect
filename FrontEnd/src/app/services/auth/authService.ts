import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { User, IUser } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    endpoint: string = 'http://localhost:3000/api';
    redirectUrl: string;
    constructor(
        private http: HttpClient
    ) { }


    // LOGIN
    loginStudent(studentToLogin: IUser): Observable<any> {
        return this.http.post<any>(`${this.endpoint}/login`, studentToLogin, {responseType: 'json'});
    }

    // LOGOUT
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('token');
    }

    // PASS FORGET
    passForget(email: String): Observable<any> {
        return this.http.post<any>(`${this.endpoint}/passReset`, email);
    }

    // PASS RESET
    resetPassword(password: Object): Observable<any> {
        return this.http.post<any>(`${this.endpoint}/resetPassword`, password);
    }
}