import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { FbAuthResponse, User } from '../../../shared/interfaces';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  get token (): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-expDate') as string);
    if(new Date() > expDate) {
      this.logout();
      return null;
    } else {
      return localStorage.getItem('fb-token');
    }
  };

  constructor(private http: HttpClient) {};

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap({
          next: response => this.setToken(response as FbAuthResponse),
          error: err => err
        }),
        catchError(this.handleError.bind(this))
      );
  };

  logout() {
    this.setToken(null);
  };

  isAuthenticated(): boolean {
    return !!this.token;
  };

  private handleError (error: HttpErrorResponse){
    const message = error.error.error.message;
    switch (message) {
      case 'INVALID_LOGIN_CREDENTIALS' :
        this.error$.next('Invalid login credentials');
        break;
      case 'EMAIL_NOT_FOUND' :
        this.error$.next('No such email exists');
        break;
      case 'INVALID_PASSWORD' :
        this.error$.next('Invalid password');
        break;
      case 'INVALID_EMAIL' :
        this.error$.next('Invalid email');
        break;
    }
    return throwError(() => error);
  };

  private setToken (response: FbAuthResponse | null) {
    if(response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-expDate', expDate.toString());
    } else {
      localStorage.clear();
    }
  };
}
