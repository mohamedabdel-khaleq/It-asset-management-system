import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-employee.html',
  styleUrls: ['./edit-employee.css'],
})
export class EditEmployee implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);

  loading = false;
  error = '';
  employeeId = '';

  employee = {
    employeeId: '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    jobTitle: '',
    status: 'Active'
  };

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    this.loading = true;
    this.error = '';

    const stateEmployee = this.router.getCurrentNavigation()?.extras.state?.['employee'] || (window.history.state as any)?.employee;

    if (stateEmployee) {
      this.employeeId = stateEmployee._id || stateEmployee.id || stateEmployee.employeeId || this.employeeId;
      this.employee = {
        employeeId: stateEmployee.employeeId || '',
        fullName: stateEmployee.fullName || '',
        email: stateEmployee.email || '',
        phone: stateEmployee.phone || '',
        department: stateEmployee.department || '',
        jobTitle: stateEmployee.jobTitle || '',
        status: stateEmployee.status || 'Active'
      };
      this.loading = false;
      return;
    }

    if (this.employeeId) {
      this.loadEmployee();
    } else {
      this.loading = false;
      this.error = 'No employee ID was provided.';
    }
  }

  loadEmployee(): void {
    this.loading = true;
    this.error = '';

    const fallbackTimer = window.setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.error = 'Unable to load employee data right now.';
      }
    }, 1500);

    this.employeeService.getEmployee(this.employeeId).subscribe({
      next: (res: any) => {
        window.clearTimeout(fallbackTimer);
        const data = res?.data || res;

        if (data && typeof data === 'object') {
          this.employee = {
            employeeId: data.employeeId || '',
            fullName: data.fullName || '',
            email: data.email || '',
            phone: data.phone || '',
            department: data.department || '',
            jobTitle: data.jobTitle || '',
            status: data.status || 'Active'
          };
        } else {
          this.employee = {
            employeeId: '',
            fullName: '',
            email: '',
            phone: '',
            department: '',
            jobTitle: '',
            status: 'Active'
          };
          this.error = 'Employee data was not received correctly.';
        }

        this.loading = false;
      },
      error: (err) => {
        window.clearTimeout(fallbackTimer);
        this.loading = false;
        this.error = err?.error?.message || 'Failed to load employee';
      }
    });
  }

  updateEmployee(): void {
    if (!this.employee.employeeId || !this.employee.fullName || !this.employee.email || !this.employee.phone || !this.employee.department || !this.employee.jobTitle) {
      this.error = 'Please fill all required fields, including phone.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe({
      next: () => {
        this.loading = false;
        alert('Employee updated successfully');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Something went wrong';
      }
    });
  }
}
