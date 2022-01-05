import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      this.login(
        accessToken
      );
    } else {
      this.signOut();
    }
  }

  isLoggedIn = new BehaviorSubject<boolean>(false);
  accessToken = new BehaviorSubject<string | null>(null);

  login(accessToken:string){
    localStorage.setItem('accessToken', accessToken);
    this.isLoggedIn.next(true);
    this.accessToken.next(accessToken);
  }
  
  signOut() {
    localStorage.removeItem('accessToken');
    this.isLoggedIn.next(false);
    this.accessToken.next(null);
  }
}
