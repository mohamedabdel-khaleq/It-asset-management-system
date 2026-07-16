import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { DepartmentService } from '../../../core/services/department';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './department-list.html',
  styleUrls: ['./department-list.css']
})
export class DepartmentList implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {}

  private departmentService = inject(DepartmentService);
  private router = inject(Router);

  departments: any[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {

    this.loading = true;
    this.error = '';

    this.departmentService.getDepartments().subscribe({

      next: (res: any) => {

        console.log('SUCCESS:', res);

        const payload =
          Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res)
              ? res
              : [];

        this.departments = payload;

        this.loading = false;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(err);

        this.departments = [];
        this.loading = false;

        this.error =
          err?.error?.message ||
          'Failed to load departments';

        this.cdr.detectChanges();

      }

    });

  }

  goToAddDepartment(): void {
    this.router.navigate(['/departments/add']);
  }

  goToEditDepartment(department: any): void {

    const id =
      department?._id ||
      department?.id;

    if (id) {

      this.router.navigate(
        ['/departments/edit', id],
        {
          state: { department }
        }
      );

    }

  }

  deleteDepartment(id: string): void {

    if (!confirm('Delete Department ?')) return;

    this.departmentService.deleteDepartment(id).subscribe({

      next: () => {

        this.loadDepartments();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}