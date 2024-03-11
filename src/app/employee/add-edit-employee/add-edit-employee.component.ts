import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  emp_name!: FormControl;
  email_id!: FormControl;
  designation!: FormControl;
  department!: FormControl;
  e!: Employee;
  // produdt$!: Observable<Employee>;
  id: string | number | null = (this.route.snapshot.paramMap.get('emp_id'))
  constructor(public fb: FormBuilder, private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {
    this.emp_name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
    this.email_id = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30),Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
    this.designation = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]);
    this.department = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]);

    this.employeeForm = this.fb.group({
      emp_name: this.emp_name,
      email_id: this.email_id,
      designation: this.designation,
      department: this.department
    });
  }

  ngOnInit(): void {
    /* redirects to /404 page if 404 error */
    if (this.id) {
      const employee$ = this.employeeService.getEmployee(this.id)
      const returnIdValue = employee$.pipe(
        catchError((error: unknown) => {
          console.log(`stream caught : ${error}`);
          return of(null);
        })
      );
      returnIdValue.subscribe((value: any) => {
        if (value === null) {
          this.router.navigate(['/404']);
        }
      });

      /* display values in edit component */
      this.employeeService.getEmployee(this.id).subscribe(
        (data: any) => {
          this.e = data[0];
          this.employeeForm.patchValue(this.e);
        }
      )
    }

  }
  addoreditEmployee() {
    if (this.id) {
      //To edit employee
      this.e = {
        emp_id: this.id as number,
        emp_name: this.employeeForm.controls['emp_name'].value,
        email_id: this.employeeForm.controls['email_id'].value,
        designation: this.employeeForm.controls['designation'].value,
        department: this.employeeForm.controls['department'].value
      }
      this.employeeService.updateEmployee(this.e).subscribe(
        (data: any) => {
          alert("Employee updated succesfully!");
          this.router.navigate(['/employeelist']);
        }
      )
    }
    else {
      //To add employee
      this.e = {
        emp_name: this.employeeForm.controls['emp_name'].value,
        email_id: this.employeeForm.controls['email_id'].value,
        designation: this.employeeForm.controls['designation'].value,
        department: this.employeeForm.controls['department'].value
      }
      this.employeeService.addEmployee(this.e).subscribe(
        (data: any) => {
          if(data.status==401){
           alert(data.msg);
          }else{
            alert("Employee added succesfully!");
            this.router.navigate(['/employeelist']);
          }     
        
        }
      )
    }
  }

  goBack() {
    this.router.navigate(['/employeelist']);
  }

}
