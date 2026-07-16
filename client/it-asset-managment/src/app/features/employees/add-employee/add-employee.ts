import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { EmployeeService } from '../../../core/services/employee';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './add-employee.html',
  styleUrls: ['./add-employee.css']
})
export class AddEmployee {

  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  loading = false;
  error = '';

  employee = {
    employeeId: '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    jobTitle: '',
    status: 'Active'
  };


  addEmployee() {

    if (
      !this.employee.employeeId ||
      !this.employee.fullName ||
      !this.employee.email ||
      !this.employee.phone ||
      !this.employee.department ||
      !this.employee.jobTitle
    ) {
      this.error = 'Please fill all required fields, including phone.';
      return;
    }


    this.loading = true;
    this.error = '';


    this.employeeService.addEmployee(this.employee)
      .subscribe({

        next: (res: any) => {

          console.log('Employee Added:', res);

          this.loading = false;

          alert('Employee Added Successfully');

          // go back to employees list
          this.router.navigateByUrl('/employees');

        },


        error: (err) => {

          this.loading = false;

          console.error('Add Employee Error:', err);

          console.log('Backend Response:', err.error);

          this.error =
            err.error?.message ||
            'Something went wrong';

        }

      });

  }

}