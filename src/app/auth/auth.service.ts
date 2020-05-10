import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError, BehaviorSubject} from 'rxjs';
import { User } from './auth.model';
import { Router } from '@angular/router';
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken : string;
  expiresIn: string;
  localId: string;
  registered? : boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
  constructor(private http : HttpClient, private router : Router) {}
  private tokenExpirationTimer : any;
  user = new BehaviorSubject<User>(null);
  login(email: string, password: string){
    return this.http
    .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtnOobnZZ-Fvv1mKKNOsC_OrCoGl6Oe6I',
    {
      email : email,
      password : password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  autoLogin(){
    const userData : {
        email : string,
        id : string,
        _token : string,
        _tokenExpirationDate : string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.user.next(loadedUser);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    },expirationDuration)
  }

  signUp(email: string, password: string){
    return this.http
    .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtnOobnZZ-Fvv1mKKNOsC_OrCoGl6Oe6I',
    {
      email : email,
      password : password,
      returnSecureToken: true
    })
    .pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  private handleAuthentication(email : string, localId : string, token : string, expiresIn : number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, token, expirationDate);
    this.user.next(user);
    console.log(expiresIn);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error message occured';
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'Email already exists';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Email or Password incorrect';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Email or Password incorrect';
          break;
      }
      return throwError(errorMessage);
  }
}
