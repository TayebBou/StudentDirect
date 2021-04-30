import { Injectable } from '@angular/core';
import { Observable, of as observableOf, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class RefreshTokenService {
    endpoint: string = 'http://localhost:3000/api';
    constructor(
        private http: HttpClient
    ) { }

    // REFRESH JWT TOKEN
    refreshToken(token: {}): Observable<any> {
        return this.http.post<any>(`${this.endpoint}/refreshToken`, token);
      }
}