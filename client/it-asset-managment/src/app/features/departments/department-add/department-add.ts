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

    this.loading = true;

    this.departmentService
      .addDepartment(this.department)
      .subscribe({

        next: (res) => {

          console.log(res);

          this.loading = false;

          alert('Department Added Successfully');

          this.router.navigate(['/departments']);

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

          this.error = 'Add Department Failed';

        }

      });

  }

}