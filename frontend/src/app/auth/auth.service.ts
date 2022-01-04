import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
    loggedIn = new BehaviorSubject<boolean>(false);

    constructor(
        private router: Router
    ) {}

    login(accessToken: string) {
        localStorage.setItem('accessToken', accessToken);
        this.loggedIn.next(true);
    }
}