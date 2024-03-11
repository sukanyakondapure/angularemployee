import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, catchError, throwError } from 'rxjs'
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // apiServer = "http://localhost:5000"
  apiServer = 'https://nodeemployee.onrender.com';

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  //get all Employees
  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.apiServer + '/getEmployee').pipe(
      catchError(this.errorHandler)
    )
  }
  //insert Employee
  addEmployee(mysqlTrainee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.apiServer + '/addEmployee', mysqlTrainee).pipe(
      catchError(this.errorHandler)
    )
  }
  //delete single Employee
  deleteEmployee(id: number | undefined): Observable<Object> {
    return this.httpClient.delete<Object>(this.apiServer + '/deleteEmployee' + `/${id}`).pipe(
      catchError(this.errorHandler)
    )
  }
  //update single Employee
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(this.apiServer + '/editEmployee' + `/${employee.emp_id}`, employee).pipe(
      catchError(this.errorHandler)
    )
  }

  //get single Employee
  getEmployee(id: string | number | null): Observable<Employee> {
    return this.httpClient.get<Employee>(this.apiServer  + '/getEmployee'+ `/${id}`).pipe(
      catchError(this.errorHandler)
    )
  }
   
  
  /*Error handler */
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
