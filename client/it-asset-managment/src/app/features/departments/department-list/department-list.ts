import { Component, inject, OnInit } from '@angular/core';
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
  styleUrl: './department-list.css'
})
export class DepartmentList implements OnInit {

  private departmentService = inject(DepartmentService);
  private router = inject(Router);
  departments: any[] = [];
  loading = true;
  ngOnInit(): void {

    this.loadDepartments();

  }

  loadDepartments(): void {
    this.loading = true;

    this.departmentService.getDepartments()
      .subscribe({

        next: (res) => {

          console.log(res);

          this.departments = res.data || [];

          this.loading = false;

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

        }

      });

  }


  goToAddDepartment() {

    this.router.navigate([
      '/departments/add'
    ]);

  }


  deleteDepartment(id: string) {

    if (!confirm('Delete Department?')) {
      return;
    }

    this.departmentService
      .deleteDepartment(id)
      .subscribe({

        next: () => {

          alert(
            'Department Deleted Successfully'
          );

          this.loadDepartments();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

}