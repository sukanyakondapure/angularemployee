import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // apiServer = 'http://localhost:5000/auth';
  apiServer = 'https://nodeemployee.onrender.com/auth';
  
  constructor(private httpClient: HttpClient) {
  }

  getToken(mysqlUser: User): Observable<User> {
    return this.httpClient.post<User>(this.apiServer + '/login', mysqlUser).pipe(
      catchError(this.errorHandler)
    )
  }

  forgotPassword(mysqlUser: User): Observable<User> {
    return this.httpClient.put<User>(this.apiServer + '/forgot_password', mysqlUser).pipe(
      catchError(this.errorHandler)
    )
  }
  resetPassword(mysqlUser: User): Observable<User> {
    return this.httpClient.put<User>(this.apiServer + '/reset_password', mysqlUser).pipe(
      catchError(this.errorHandler)
    )
  }
  getUserDetails() {
    if(localStorage.getItem('userData')){
      return localStorage.getItem('userData')
    }else{
      return null
    }
    
  }
  setDataInLocalStorage(variableName: string, data: string) {
      localStorage.setItem(variableName, data);
  }
  getToken1() {
      return localStorage.getItem('token');
  }
  clearStorage() {
      localStorage.clear();
  }
  
  getConnection(): Observable<any> {
    return this.httpClient.get<any>("https://nodeemployee.onrender.com").pipe(
     catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code  HIII: ${error.status}\nMessage: ${error.message}`;

    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

 
}
