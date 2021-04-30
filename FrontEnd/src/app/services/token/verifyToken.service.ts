import { Injectable } from '@angular/core';
import { Observable, of as observableOf, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class VerifyTokenService {
    endpoint: string = 'http://localhost:3000/api';
    constructor(
        private http: HttpClient
    ) { }

    // GET TOKEN
    getToken(): string {
        const token = localStorage.getItem('token');
        if(token){
            return token
        }
    }
    // Verify JWT TOKEN
    verifyToken(token: {}): Observable<boolean> {
        return new Observable(observer => {
            this.http.post<any>(`${this.endpoint}/verifyToken`, token, { observe: 'response' })
                .subscribe(response => {
                    //console.log(response.status);
                    if (response.status == 202) {
                        //console.log('autorisé');
                        return observer.next(true);
                    }
                }, (err) => {
                    if (err.status == 401) {
                        //console.log('Non autorisé');
                        return observer.next(false);
                    }
                })
        })
    }
} 