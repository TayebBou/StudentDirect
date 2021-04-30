import * as jwtDecode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, Router } from '@angular/router';
import { AuthService } from './authService';
import { VerifyTokenService } from '../token/verifyToken.service';
import { Observable, of, throwError } from 'rxjs';


@Injectable()
export class AuthGuardService implements CanLoad {
    public verified: boolean
    constructor(private authService: AuthService, private verifyJwt: VerifyTokenService, private router: Router) {
    }

    canLoad(route: Route): boolean | Observable<boolean> {
        if (localStorage.getItem('token')) {
            try {
                console.log("CANLOAD");
                
                return new Observable(observer => {
                    this.verifyJwt.verifyToken({ token: localStorage.getItem('token') })
                        .subscribe(response => {
                            console.log(response);
                            if (response) {
                                if (jwtDecode(localStorage.getItem('token')).role == 'administrateur') {
                                    console.log('est ADMIN');
                                    observer.next(true);
                                    observer.complete();
                                } else {
                                    console.log('est STUDENT');
                                    observer.next(true);
                                    observer.complete();
                                }
                            } else {
                                this.router.navigateByUrl('/login');
                                observer.next(false)
                                observer.complete();
                            }
                        })
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            this.router.navigateByUrl('/login');
            return false
        }
    }
} 