import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';

import { EmployeeService } from '../../../core/services/employee';


@Component({
  selector: "app-employee-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./employee-list.html",
  styleUrls: ["./employee-list.css"],
})
export class EmployeeList implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  private employeeService = inject(EmployeeService);

  private router = inject(Router);

  employees: any[] = [];

  loading = true;

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;

    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        const payload = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        this.employees = payload;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);

        this.employees = [];

        this.loading = false;
      },
    });
  }

  goToAddEmployee(): void {
    this.router.navigate(["/employees/add"]);
  }

  goToEditEmployee(employee: any): void {
    const id = employee?._id || employee?.id || employee?.employeeId;

    if (id) {
      this.router.navigate(["/employees/edit", id], { state: { employee } });
    }
  }

  goToEmployeeDetails(employee: any): void {
    const id = employee?._id || employee?.id || employee?.employeeId;

    if (id) {
      this.router.navigate(["/employees", id], { state: { employee } });
    }
  }

  deleteEmployee(id: string): void {
    if (!confirm("Delete Employee ?")) return;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}