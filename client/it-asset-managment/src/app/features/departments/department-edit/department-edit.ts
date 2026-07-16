import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DepartmentService } from '../../../core/services/department';

@Component({
  selector: 'app-department-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './department-edit.html',
  styleUrl: './department-edit.css',
})
export class DepartmentEdit implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private departmentService = inject(DepartmentService);

  loading = false;
  error = '';
  departmentId = '';

  department = {
    name: '',
    description: '',
    location: '',
    manager: '',
    status: 'Active'
  };

  ngOnInit(): void {
    this.departmentId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.departmentId) {
      this.error = 'No department ID was provided.';
      return;
    }

    this.loadDepartment();
  }

  loadDepartment(): void {
    this.loading = true;
    this.error = '';

    this.departmentService.getDepartment(this.departmentId).subscribe({
      next: (res: any) => {
        const data = res?.data || res;

        this.department = {
          name: data?.name || '',
          description: data?.description || '',
          location: data?.location || '',
          manager: data?.manager || '',
          status: data?.status || 'Active'
        };

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = err?.error?.message || 'Failed to load department.';
      }
    });
  }

  updateDepartment(): void {
    this.error = '';

    const name = this.department.name.trim();
    const description = this.department.description.trim();
    const location = this.department.location.trim();
    const manager = this.department.manager.trim();

    if (!name || !description || !location || !manager) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    const payload = {
      name,
      description,
      location,
      manager,
      status: this.department.status
    };

    this.loading = true;

    this.departmentService.updateDepartment(this.departmentId, payload).subscribe({
      next: () => {
        this.loading = false;
        alert('Department updated successfully');
        this.router.navigate(['/departments'], { state: { refreshDepartments: true } });
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        const message = err?.error?.message || err?.message || 'Failed to update department. Please try again.';
        this.error = message;
      }
    });
  }
}
