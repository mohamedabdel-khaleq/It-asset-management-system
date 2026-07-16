import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { EmployeeService } from '../../../core/services/employee';


@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css'
})
export class EmployeeDetails implements OnInit {


  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);


  employee: any = null;

  loading = true;
  error = '';


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    console.log("Employee ID:", id);


    if (id) {

      this.loadEmployee(id);

    } else {

      this.loading = false;
      this.error = 'No employee ID was provided.';

    }

  }


  loadEmployee(id: string): void {

    this.loading = true;

    this.employeeService.getEmployee(id).subscribe({

      next: (res: any) => {

        console.log(res);

        this.employee = res?.data || res;

        this.loading = false;

      },


      error: (err) => {

        console.error(err);

        this.error = 'Failed to load employee details.';

        this.loading = false;

      }

    });

  }

}