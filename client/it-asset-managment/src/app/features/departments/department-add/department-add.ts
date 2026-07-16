import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { DepartmentService } from '../../../core/services/department';

@Component({
  selector: 'app-department-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './department-add.html',
  styleUrl: './department-add.css'
})
export class DepartmentAdd {

  private departmentService = inject(DepartmentService);
  private router = inject(Router);

  loading = false;

  error = '';

  department = {
    name: '',
    description: '',
    location: '',
    manager: '',
    status: 'Active'
  };

  addDepartment() {
    this.error = '';

    const name = this.department.name.trim();
    const description = this.department.description.trim();
    const location = this.department.location.trim();
    const manager = this.department.manager.trim();

    if (!name || !description || !location || !manager) {
      this.error = 'Please fill in all required fields: name, description, location, and manager.';
      return;
    }

    const payload = {
      ...this.department,
      name,
      description,
      location,
      manager,
    };

    this.loading = true;

    this.departmentService.addDepartment(payload).subscribe({
      next: () => {
        this.loading = false;
        alert('Department added successfully');
        this.router.navigate(['/departments'], { state: { refreshDepartments: true } });
      },
      error: (err) => {
        console.error('Add department error:', err);
        this.loading = false;
        const message = err?.error?.message || err?.message || 'Failed to add department. Please try again.';
        this.error = message;
      }
    });
  }

}