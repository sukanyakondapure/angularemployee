import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import swal from 'sweetalert2'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  employees: Employee[] = [];
  va: number=1;
  myArray:any;
  employeeCount: number = 3;
  dataSource: any;
  static cnt: any;

  displayedColumns: string[] = ['emp_id', 'emp_name', 'email_id', 'designation', 'department', 'action'];
  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService) {
    EmployeeListComponent.cnt=1
   }

  ngOnInit(): void {
    this.getData();
  
  }

  getData() {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log(this.employees);

      this.dataSource = new MatTableDataSource<Employee>(this.employees)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  /* delete alert*/
  async deleteConfirmation(tid: number | undefined) {
    let result = await swal.fire({
      title: 'Are you sure?',
      text: "Employee will be deleted",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      this.deleteEmployee(tid)
      swal.fire({
        title: 'Deleted',
        text: "Employee is deleted",
        icon: 'success',
      })

    }

  }
  /* delete actual data */
  deleteEmployee(tid: number | undefined): void {
    this.employeeService.deleteEmployee(tid).subscribe((data) => {
      alert("Employee deleted succesfully!");
      this.router.navigate(['/employeelist']).then(() => {
        this.getData();
      });
    })

  }
  filterchange(event: Event) {
    const filterval = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterval
  }

  get staticUrlArray() {
    return EmployeeListComponent.cnt;
  }
}
