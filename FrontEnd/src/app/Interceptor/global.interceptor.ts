import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, EMPTY, of } from 'rxjs';

import { VerifyTokenService } from '../services/token/verifyToken.service';
import { catchError, tap, switchMap, finalize } from 'rxjs/operators';
import { RefreshTokenService } from '../services/token/refreshToken.service';
import { AuthService } from '../services/auth/authService';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
    constructor(private tokenSrv: VerifyTokenService, private refreshJwt: RefreshTokenService, private authSrv: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("rentre mn jdid");
        const InitRequest = request;
        const token = this.tokenSrv.getToken();
        console.log(token);
        if (token) {
            if (request.url == "http://localhost:3000/api/verifyToken") {
                console.log('VERIFY');

                return next.handle(request)
                    .pipe(
                        Response => {
                            Response.subscribe(response => {
                                if (response['body']) {
                                    console.log(response['body'].newToken);
                                    localStorage.setItem('token', response['body'].newToken);
                                }
                            })
                            return next.handle(request)
                        })
            } else {
                if (request.url == "http://localhost:3000/api/refreshToken") {
                    console.log('REFRECH');
                    console.log(request);
                    return next.handle(request)
                        .pipe(
                            Response => {
                                Response.subscribe(response => {
                                    if (response['body']) {
                                        console.log(response['body'].newToken);
                                        localStorage.setItem('token', response['body'].newToken);
                                    }
                                })
                                return next.handle(request)
                            })
                } else {
                    console.log("D ABORD ICI");

                    request = InitRequest.clone({
                        setHeaders: {
                            "auth-token": token
                        }
                    });
                    console.log(request);

                    return next.handle(request)
                        .pipe(
                            catchError(
                                error => {
                                    if (error.error == "Expired Token") {
                                        return new Observable<any>(observer => {
                                            this.refreshJwt.refreshToken({ token }).subscribe(async response => {
                                                console.log(response.newToken);
                                                request = await InitRequest.clone({
                                                    setHeaders: {
                                                        "auth-token": response.newToken
                                                    }
                                                });
                                                console.log(request);

                                                return await observer.next(request);
                                                //localStorage.setItem('token', response.newToken);
                                            });
                                        });
                                    } else {
                                        return next.handle(request)
                                    }
                                }
                            ))
                }
            }
        }
        return next.handle(request)
    }
}